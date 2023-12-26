// 1. 解析 HTML
// 2. 把 html 和 css 放到 webComponent 里面
// 3. 把 js 放到 iframe 里面执行
// 4. 执行 js 之前有些方法是父应用的，有些事 iframe 里面的，有些是 webComponent 里面的，所以要做一些兼容
// 5. 比如 document.querySelector 在webComponent里，弹窗在主应用里，hisrtory.pushState 在主应用

Object.definePropertiey(iframeWindow.Document.prototype, 'querySelector', {
  get() {
    // document.querySelector('abc') ==> sandbox.shadowRoot['querySelector']('abc')
    return new Proxy(sandbox.shadowRoot['querySelector'], {
      apply(_target, thisArgs, args) {
        return thisArgs.querySelector.apply(sandbox.shadowRoot, args)
    }})
  }
})