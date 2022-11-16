// Promise 状态
const statusMap = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}
// 将promise 设置为 fulfilled 状态
function fulfilledPromise(promise, value) {
  //只能从 pending 状态转换为其他状态  
  if (promise.status !== statusMap.PENDING) {
    return
  }
  promise.status = statusMap.FULFILLED
  promise.value = value
  // promise 状态变更了需要执行 fulfilledCbs
  runCbs(promise.fulfilledCbs, value)
}
// 将 promise 设置为 rejected 状态
function rejectedPromise(promise, reason) {
  // 只能从 pending 状态转换为其他状态
  if (promise.status !== statusMap.PENDING) {
    return
  }
  promise.status = statusMap.REJECTED
  promise.reason = reason

  // promise 状态变更了需要执行 rejectedCbs

  runCbs(promise.rejectedCbs, reason)
}
// 是否是函数
function isFunction(fn) {
  return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]'
}
// 是否是 Promise 实例
function isPromise(p) {
  return p instanceof Promise
}
// 是否是普通对象
function isObject(obj) {
  return Object.prototype.toString.call(obj).toLocaleLowerCase() === '[object object]'
}
// 如何处理 then 里面的返回值 promise
function resolvedPromise(promise, x) {
  // promise 和 x 指向相同会出现循环调用直接 return
  if (promise === x) {
    rejectedPromise(promise, new TypeError('cant be the same'))
    return
  }
  // x 是一个 promise 
  if (isPromise(x)) {
    if (x.status === statusMap.FULFILLED) {
      fulfilledPromise(promise, x.value)
      return
    }
    if (x.status === statusMap.REJECTED) {
      rejectedPromise(promise, x.reason)
      return
    }
    if (x.status === statusMap.PENDING) {
      x.then(() => {
        fulfilledPromise(promise, x.value)
      }, () => {
        rejectedPromise(promise, x.reason)
      })
      return
    }
    return
  }
  // x 是一个对象或一个函数
  if (isObject(x) || isFunction(x)) {
    let then
    let called = false
    try {
      then = x.then
    } catch (error) {
      rejectedPromise(promise, error)
      return
    }
    if (isFunction(then)) {
      try {
        then.call(
          x, (v) => {
            if (called) {
              return
            }
            called = true
            resolvedPromise(promise, v)
          }, (r) => {
            if (called) {
              return
            }
            called = true
            rejectedPromise(promise, r)
          }
        )
      } catch (error) {
        if (called) {
          return
        }
        called = true
        rejectedPromise(promise, error)
      }
      return
    } else {
      fulfilledPromise(promise, x)
      return
    } 
  } else { // x不是对象或者函数
    fulfilledPromise(promise, x)
    return
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
      resolvedPromise(this, value)
    }, (reason) => {
      rejectedPromise(this, reason)
    })
  } 
  // 两个参数 
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
          resolvedPromise(promise2, x)
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
          const x = onRejected(promise1.reason)
          // 根据返回值来决定返回的 promise2
          resolvedPromise(promise2, x)
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
            resolvedPromise(promise2, x)
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
            resolvedPromise(promise2, x)
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