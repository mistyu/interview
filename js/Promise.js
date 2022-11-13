// Promise 状态
const statusMap = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}
// 将 promise 设置成 fulfilled 状态
function fulfilledPromise(promise, value) {
  // 只能从 pending 状态转化为其他状态
  if (promise.status !== statusMap.PENDING) {
    return
  }
  promise.status = statusMap.FULFILLED
  promise.value = value
  runCbs(promise.fulfilledCbs, value)
}
// 将 promise 设置成 rejected 状态
function rejectedPromise(promise, reason) {
  // 只能从 pending 状态转化为其他状态
  if (promise.status !== statusMap.PENDING) {
    return
  }
  promise.status = statusMap.REJECTED
  promise.reason = reason
  runCbs(promise.rejectedCbs, reason)
}
// 是否是函数
function isFunction(fn) {
  return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]'
}
function isPromise(p) {
  return p instanceof Promise
}
function isObject(obj) {
  return Object.prototype.toString.call(obj).toLocaleLowerCase() === '[object object]'
}
// 如何处理 then 里面的返回值promise
function resolvePromise(promise, x) {
  // promise 和 x 指向相同会出现循环调用直接 return
  if (promise === x) {
    rejectedPromise(promise, new TypeError('cant be the same'))
    return
  }
  // x 是一个 promise
  if (isPromise(x)) {
    if (x.status === statusMap.FULFILLED) {
      fulfilledPromise(promise, x.value)
    } else if (x.status === statusMap.REJECTED) {
      rejectedPromise(promise, x.reason)
    } else {
      x.then(() => {
        fulfilledPromise(promise, x.value)
      }, () => {
        rejectedPromise(promise, x.reason)
      })
    }
  }
  // x 是一个对象或一个函数
  if (isObject(x) || isFunction(x)) {
    let then
    let called = false
    try {
      then = x.then()
    } catch (error) {
      rejectedPromise(promise, error)
      return
    }
    if (isFunction(then)) {
      try {
        then.call(x, (v) => {
          if (called) {
            return
          }
          called = true
          resolvePromise(promise, v)
        }, (r) => {
          if (called) {
            return
          }
          called = true
          rejectedPromise(promise, r)
        })
      } catch (error) {
        if (called) {
          return
        }
        called = true
        rejectedPromise(promise, error)
      }
      return
    } else { // x 不是对象也不是函数
      fulfilledPromise(promise, x)
      return
    }
  }
}
// promise 状态改变后执行 then
function runCbs(cbs, value) {
  cbs.forEach(cb => cb(value))
}

class Promise {
  constructor(fn) {
    this.status = statusMap.PENDING
    this.value = undefined
    this.reason = undefined
    // then fulfilled callback
    this.fulfilledCbs = []
    // then rejected callback
    this.rejectedCbs = []
    fn((value) => {
      resolvePromise(this, value)
    }, (reason) => {
      rejectedPromise(this, reason)
    })
  }

  then(onFulfilled, onRejected) {
    const promise1 = this
    const promise2 = new Promise(() => {})
    if (promise1.status === statusMap.FULFILLED) {
      // 如果参数不是函数，则会忽略，返回 promise1
      if (!isFunction(onFulfilled)) {
        return promise1
      }
      setTimeout(() => {
        try {
          const x = onFulfilled(promise1.value)
          // 根据返回值来决定返回的 promise2
          resolvePromise(promise2, x)
        } catch (error) {
          rejectedPromise(promise2, error)
        }
      }, 0)
    }
    if (promise1.status === statusMap.REJECTED) {
      // 如果参数不是函数，则会忽略，返回 promise1
      if (!isFunction(onRejected)) {
        return promise1
      }
      setTimeout(() => {
        try {
          const x = onRejected(promise1.value)
          // 根据返回值来决定返回的 promise2
          resolvePromise(promise2, x)
        } catch (error) {
          rejectedPromise(promise2, error)
        }
      }, 0)
    }
    if (promise1.status === statusMap.PENDING) {
      onFulfilled = isFunction(onFulfilled)
        ? onFulfilled
        : value => value
      onRejected = isFunction(onRejected)
        ? onRejected
        : err => {
          throw err
      }
      
      promise1.fulfilledCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(promise1.value)
            // 根据返回值来决定返回的 promise2
            resolvePromise(promise2, x)
          } catch (error) {
            rejectedPromise(promise2, error)
          }
        }, 0)
      })
      promise1.rejectedCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(promise1.reason)
            // 根据返回值来决定返回的 promise2
            resolvePromise(promise2, x)
          } catch (error) {
            rejectedPromise(promise2, error)
          }
        }, 0)
      })
    }
    return promise2
  }
}

// 如何测试？
// npm i promises-aplus-tests -g
// promises-aplus-tests ./Promise.js
// 测试用到的钩子
Promise.deferred = function () {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })

  return deferred
}

module.exports = Promise