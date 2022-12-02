## Vuex

### Vuex 是如果拦截不在 moutation 中更改 state
初始化一个 `commiting = false`，同下
```js
...
console.assert(store._commiting, '错误修改 state')
...
```

### Vuex 是如何拦截异步修改
在 mutation 之前修改 `commiting = true`，调用 mutation 会更改状态，监控当前状态变化，如果状态变化的时候 `commiting = true`则是同步更改，如果状态变化的时候 `commiting = false`则是异步更改
```js
watch(() => store._state.data, () => {
  console.assert(store._commiting, '错误修改 state')
} /* 监控 store 中数据变化，变化后就会执行回调函数 */, {
  deep: true,
  flush: 'sycn' // 同步监听
})
```
