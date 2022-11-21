// 所有的更新都是通过 nextTick 方法

let isUsingMicroTask = false
let timerFunc
// 优先以 Promise 微任务的方式执行
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]') {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (type setImmediate !== 'undefined' && isNative(setImmediate)) {
  // setImmediate 只有 IE 和 Node 支持, 性能比 setTimeout 好
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    // setTimeout 至少会在 400ms 执行，即使这是成 0
    setTimeout(flushCallbacks, 0)
  }
}

let callbacks = []
let pending = false
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

function nextTick (cb, ctx) {
  let _resolve
  // 把 cb 加上异常处理存入 callbacks 数组中
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (error) {
        handlerError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 队列是否在处理
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}


