## Vue3 收集依赖/更新

### 收集依赖

1. targetMap：`new WeakMap()`

key: 目标对象
value: 2.

2. depsMap：`new Map()`

key: 对象的每一个属性
value: 3. 

3. dep：`new Set()` (set可以去重，这样就不会收集重复依赖) 

value: effect函数

### effect
```js
let activeEffect = null
function effect (callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，去收集依赖
  activeEffect = null
}
```

### track
```js
let targetMap = new WeakMap()

export function track (target, key) {
  if (!activeEffect) return

  let depsMap = target.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}
```

### trigger
```js
function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}
```