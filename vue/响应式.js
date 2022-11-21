function observe (value, asRootData) {
  // ...
  const ob = new Observer(value)
  // ...
  return ob
}

function def (obj, key, val, /* ...args */) {
  Object.defineProperty(obj, key, {
    value: val,
    // ...
  })
}

class Observer {
  // ...
  constructor (value) {
    // ...
    // 依赖，ob.dep
    this.dep = new Dep()
    // 将实例挂载到观察对象的 __ob__ 属性
    def(value, '__ob__', this)
    // 数据响应式处理
    if (Array.isArray(value)) {
      if (hasProto) {
        // 将会改变原数组的方法重写到 __proto__ 上
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // 为数组中的每一个对象创建一个 observer
      this.observerArray(value)
    } else {
      // 遍历对象中的每一个属性转换成 setter/getter
      this.walk(value)
    }
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  observerArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  // 为当前这个 key 收集依赖
  const dep = new Dep()
  // ...
  val = obj[key]
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val // 如果用户传入了 getter 就用用户传入的
      // 如果存在当前依赖目标，即 watcher，则建立依赖
      if (Dep.target) {
        dep.depend()
        // 如果子观察目标存在，也要建立依赖关系
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : obj[key]
      // 新值等于旧值或新值旧值为 NaN 则不执行
      if (newVal === value || (newVal !== newVal&& value !== value)) {
        return
      }
      // ...
      val = newVal
      // 如果新值是对象，继续做响应式处理
      childOb = !shallow && observe(newVal)
      // 派发更新
      dep.notify()
    }
  })
}

let uid = 0
class Dep {
  // watcher 对象，会在调用 $mount 挂载组件时 new Watcher 将 vm(当前组件) 赋值给 target
  static target
  id
  // dep 实例对应的 watcher 对象、订阅者数组
  subs

  constructor() {
    id = uid++
    this.subs = []
  }

  // 添加新的订阅者 watcher
  addSub (sub) {
    this.subs.push(sub)
  }
  // 移除订阅者
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // 将观察对象和 watcher 建立依赖
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 派发更新
  notify () {
    const subs = this.subs.slice()
    // 排序为了保证 watcher 的执行顺序
    subs.sort((a, b) => a.id - b.id)
    // sub 就是每一个 watcher
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

class Watcher {
  // noop 用户 watcher
  constructor (vm, expOrFn /* updateComponet */, cb, options, isRenderWatcher) {
    this.vm = vm
    // 渲染 watcher
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // 所有的 watcher
    vm._watchers.push(this)

    // options.lazy 是否延迟执行, computed 是 true
    // options.dirty // 是否使用上次缓存的结果 computed

    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
  }
  // ...
  // 添加依赖
  addDep (dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push((dep))
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  // ...
  update () {
    if (this.lazy)  {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      // 将 watcher 放入wathcer队列中
      queueWatcher(this)
    }
  }
  // 更新视图, computed, watch, 组件更新完毕之后会调用用 activated 和 updeted
  run() {
    // ...
    if (this.user) {
      try {
        this.cb.call(this.vm, value, oldValue)
      } catch (error) {
        
      }
    } else {
      this.cb.call(this.vm, value, oldValue)
    }
  } 
}

// 数组的响应式处理
function protoAugment(target, src) {
  target.__proto__ = src
}
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
// 修改原数组的方法，让这些方法可以进行响应式处理
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(method => {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 执行数组的原始方法
    const result = original.apply(this, args)
    // 获取数组对象的 ob 对象 
    // this 就是响应式数组
    const ob = this.__ob__

    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 对插入的新元素设置为响应式数据
    if (inserted) ob.observeArray(inserted)
    // 派发更新
    ob.dep.notify()

    return result
  })
})
