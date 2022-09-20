// 频繁触发时只执行一次，time时间后才能继续触发
const debounce = (fn, time, immeadite = true) => {
  let timer = null
  return (...args) => {
    const _this = this
    if (timer !== null) {
      clearTimeout(timer)
      return
    }
    if (immeadite && !timer) fn.bind(_this, ...args)
    timer = setTimeout(() => {
      if (!immeadite) fn.bind(_this, ...args)
      clearTimeout(timer)
      timer = null
    }, time)
  }
}
