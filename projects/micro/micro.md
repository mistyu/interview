## 微前端
> 微前端相关

### shadow dom
隔离方案
```js
const shadow = document.querySelector('shadow')
// 创建一个 shadow dom
shadow.attachShadow({ mode: 'close' })
const p = document.createElement('p')
p.innerHTML = `hello shadow dom`
const style = document.createElement('style')
style.textContent = `
  p {
    color: red;
  }
`
shadow.appendChild(style)
shadow.appendChild(p)
// 隔离样式
```
缺点：比如弹窗等挂在在全局 body 下的话就会有问题，shadow dom 内的样式无法影响到

### js 沙箱
1. 快照沙箱
```js
class SnapshotSandbox {
  constructor () {
    this.proxy = window // window 属性
    this.modifyPropsMap = {} // 记录在 window 上的修改
    this.active()
  }
  active () {
    this.windowSnapshot = {}
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        this.windowSnapshot[prop] = window[prop]
      }
    }
    // 把上一次的修改在复原
    Object.keys(this.modifyPropsMap).forEach(p => {
      window[p] = this.modifyPropsMap[p]
    })
  }
  deactive () {
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        if (window[prop] !== this.windowSnapshot[prop]) {
          // 将修改过的保存起来
          this.modifyPropsMap[prop] = window[prop]
          // 还原成之前的
          window[prop] = this.windowSnapshot
        }
      }
    }
  }
}
const sandbox = new SnapshotSandbox()
((window) => {
  window.a = 1
  window.b = 2
  console.log(window.a, window.b)
  sandbox.deactive()
  console.log(window.a, window.b)
  sandbox.active()
  console.log(window.a, window.b)
})(sandbox.porxy) // 就是 window
```
没办法处理多个子应用沙箱

2. 代理实现
可以实现多个子应用沙箱，需要使用 es6 的 proxy
```js
class ProxySandbox {
  constructor () {
    const rawWindow = window
    const fakeWindow = {}
    const proxy = new Proxy(fakeWindow, {
      set (target, p, value) {
        target[p] = value
      },
      get (target, p) {
        return target[p] || rawWindow[p]
      }
    })
    this.proxy = proxy
  }
}
const sandbox1 = new ProxySandbox()
const sandbox2 = new ProxySandbox()
window.a = 1
((window) => {
  window.a = 'hello'
  console.log(window.a)
})(sandbox1.proxy)
((window) => {
  window.a = 'world'
  console.log(window.a)
})(sandbox2.proxy)
```
