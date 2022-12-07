## Vue3

### Vue3 相较于 Vue2 有哪些升级
* Vue3 更注重模块上的拆分，在 2.x 中无法单独使用部分模块，需要引入完整Vue.js，而 3.x 中模块耦合度低，模块可以独立使用。
* 更好的 tree-shaking

### 为什么 Proxy 要配合 Reflect 一起使用
* 触发代理对象的劫持时保证正确的 this 上下文指向，receiver 为 getter, setter 调用时的 this 值
* Reflect 操作对象的时候，是有返回值的，可以根据返回值来做不同的事