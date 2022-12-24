## Vue3

### Vue3 相较于 Vue2 有哪些升级
* Vue3 更注重模块上的拆分，在 2.x 中无法单独使用部分模块，需要引入完整Vue.js，而 3.x 中模块耦合度低，模块可以独立使用。
* 更好的 tree-shaking

### 为什么 Proxy 要配合 Reflect 一起使用
* 触发代理对象的劫持时保证正确的 this 上下文指向，receiver 为 getter, setter 调用时的 this 值
* Reflect 操作对象的时候，是有返回值的，可以根据返回值来做不同的事

### 用户自定义依赖收集
```ts
import { effect, ref } from 'vue'

const state = ref('')
const runner = effect(() => {
  console.log(state.value)
})
// 1. 依赖收集触发 effect
state.value = 'update'
// 2. 手动更新 effect
runner.effect.run()
// 3. 停止响应式
runner.effect.stop()
```

### watch 回调函数的第三个参数
一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求