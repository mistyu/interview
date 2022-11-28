// 将函数通过 Promise 链式调用
function flattenFns (fns) {
  fns = Array.isArray(fns) ? fns : [fns]
  // 将 fns 链式调用 -> Promise.resolve().then(() => fn1(...args)).then(() => fn2(...args)).then(() => fn3(...args)) ...
  return (...args) => fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve())
}
