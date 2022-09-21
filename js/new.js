const myNew = (Func, ...params) => {
  // 创建一个空对象实例，并且原型指向 Func.prototype
  const obj = {}
  obj.__proto__ = Func.prototype
  // 执行 Func 并且 this 指向实例
  const res = Func.bind(obj, ...params)
  // 如果 Func 的返回值是复杂类型，则返回它，否则返回实例
  if ((typeof res === 'object' || typeof res === 'function') && res !== null) {
    return res
  }
  return obj
}
