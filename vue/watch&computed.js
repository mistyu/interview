function createWatcher (vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  // 字符串的话就直接取 methods 上的方法执行
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

function $watch (expOrFn, cb, options) {
  const vm = this
  if (isPlainObject(cb)) {
    // 判断如果 cb 是对象 执行 createWatcher
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  // 标记为用户 watcher
  options.user = true
  // 创建用户 watcher
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    // 立即执行一次 cb
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handlerError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
    }
  }
  // 返回取消监听的方法
  return function unwatchFn() {
    watcher.teardown()
  }
}

const computedWatcherOptions = {
  lazy: true // render 的时候在调用 watcher.get() 求值
}
function initComputed (vm, computed) {
  // ...
  new Watcher(vm, getter /* conputed 中的函数 */, noop, computedWatcherOptions)
}

// Vue3 computed
function computed (getter) {
  const result = ref()

  effect(() => (result.value = getter()))

  return result
}
