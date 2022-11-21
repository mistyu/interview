## new Vue 的过程

0. Vue构造函数执行之前会执行一系列的 init 方法来挂载静态成员和实例成员，如注册 $props, $set, $delete, $emit, $nextTick 等
1. 调用构造函数将传入的 options 传入 init 方法并调用，做一些初始化的事情，策略合并 options（Vue构造函数的options 和 用户传入的options），初始化事件，生命周期方法等
```js
// $parent, $children, $root, $refs
initLifecycle(vm)
// 自定义事件
initEvents(vm)
// render 方法, $attrs, $listeners
initRender(vm)
// 调用 beforeCreate
callHook(vm, 'beforeCreate') // 无法访问 data, props 等
// 把 inject 的成员注入到 vm
initInjections(vm)
// 初始化 _props, methods, data, computed, watch
initState(vm) // 
// provide
initProvide(vm)
// 调用 created
callHook(vm, 'created')
```
2. 调用 $mount 挂载组件，执行 render 转化为虚拟 dom，执行 beforeMount，创建 watcher 关联响应式数据 和 render，调用 mounted 
  * 有 render 就用 render，没有就用 tmeplate 转换成 render
  * 调用 beforeMount 
  * 创建 watcher 并且把 vm 传入 （不是首次渲染的话会调用 beforeUpdate）
  * 调用 mounted 