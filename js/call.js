Function.prototype.call = (_this, ...params) => {
  _this = _this == null ? window : _this
  if (!/^(function|object)$/.test(_this)) {
    // Object 构造函数将给定的值包装为一个新对象。
    // 如果给定的值是 null 或 undefined, 它会创建并返回一个空对象。
    // 否则，它将返回一个和给定的值相对应的类型的对象。
    // 如果给定值是一个已经存在的对象，则会返回这个已经存在的值（相同地址）。
    _this = Object(_this)
  }
  const key = new Symbol('callThis')
  _this[key] = this
  const result = _this[key](...params)
  delete _this[key]
  return result
}