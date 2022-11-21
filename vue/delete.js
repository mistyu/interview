function delete (target, key) {
  if (Array.isArray(target)) {
    // 已经是重写了 splice 之后的
    target.splice(key, 1)
    return
  }
  const ob = target.__ob__
  // 如果 target 中不存在 key
  if (!hasOwn(target, key)) {
    return
  }
  // 删除属性
  delete target[key]
  if (!ob) {
    return
  }
  // 派发更新
  ob.dep.notify()
}
