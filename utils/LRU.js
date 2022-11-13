// Latest Recently Used 最近最少使用
// 选择将最近最久未使用的数据淘汰
class LRUCache {
  constructor (limit) {
    this.limit = limit
    this.cacheData = new Map()
  }

  set (key, value) {
    // 存在就要删除重新设置
    if (this.cacheData.has(key)) {
      this.cacheData.delete(key)
    }
    this.cacheData.set(key, value)
    // 超出最大长度则删除第一个数据
    if (this.cacheData.size > this.limit) {
      const overdueKey = this.cacheData.keys().next().value
      this.cacheData.delete(overdueKey)
    }
  }

  get (key) {
    if (!this.cacheData.has(key)) {
      return null
    }
    const value = this.cacheData.get(key)
    this.cacheData.delete(key)
    this.cacheData.set(key, value)
    return value
  }
}
