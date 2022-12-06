const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

function reactive (target) {
  if (!isObject(target)) return target
    
  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      track(track, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    }
    set (target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger()
      }
      return result
    },
    deleteProperty (target, key) {
      const hasKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hasKey && result) {
        // 触发更新
        trigger()
      }

      return result
    }
  }

  return new Proxy(target, handler)
}
