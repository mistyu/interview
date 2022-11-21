function set (target, key, avl) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length; key)
    // 已经是重写了 splice 之后的
    target.splice(key, 1, val)
    return val
  }
  // 如果 key 已经存在了
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 提取 target 中的 observer
  const ob = target.__ob__
  // 如果 target 是 Vue 实例或者 $data
  if (target._isVue || (ob && ob.vmCount)) {
    return val
  }
  // 如果 ob 不存在，则说明 target 不是响应式数据
  if (!ob) {
    target[key] = val
    return val
  }
  // 把 key 设置成响应式
  defineReactive(ob.value, key, val)
  // 发送通知
  ob.dep.notify()

  retur nval
}