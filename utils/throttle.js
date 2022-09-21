const throttle = (fn, time, immeadite = true) => {
  let timer = null
  return (...args) => {
    let _this = this
    if (timer !== null) return
    if (immeadite) fn.bind(_this, ...args)
    timer = setTimeout(() => {
      if (!immeadite) fn.bind(_this, ...args)
      clearTimeout(timer)
      timer = null
    }, time)
  }
}
