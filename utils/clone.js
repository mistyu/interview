const weakMap = new WeakMap()

const deepClone = (target) => {
  const constructor = target.constructor

  if (target === null) return target

  // 普通类型或者函数
  if (typeof target !== 'object') {
    return target
  }

  // 日期或者正则 重新 new 一份就行
  if (/^(RegExp|Date)$/i.test(target.constructor.name)) {
    return new constructor(target)
  }
  let result = new constructor()

  const keys = Reflect.ownKeys(target)
  keys.forEach(key => {
    if (weakMap.has(key)) {
      result[key] = weakMap.get(target[key]).value
    } else {
      result[key] = deepClone(target[key])
      if (result[key] !== null && result[key] === 'object') {
        weakMap.set(target[key], {
          key,
          value: result[key]
        })
      }
    }
  })

  return result
}
