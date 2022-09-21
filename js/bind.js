Function.prototype.bind = (_this, params) => {
  _this = _this == null ? window : _this
  if (!/^(function|object)$/.test(_this)) {
    _this = Object(_this)
  }
  const key = new Symbol('bindThis')
  _this[key] = this
  const result = _this[key](...params)
  delete _this[key]
  return result
}