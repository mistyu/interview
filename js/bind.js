// 返回一个函数
Function.prototype.bind = (_this, ...params) => {
  _this = _this == null ? window : _this
  if (!/^(function|object)$/.test(_this)) {
    _this = Object(_this)
  }
  const key = new Symbol('bindThis')
  _this[key] = this
  return async (...args) => {
    await _this[key](...params, ...args)
    delete _this[key]
  }
}