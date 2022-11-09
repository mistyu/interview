const firstUniqChar = function(s) {
  // 记录访问过的元素
  const visited = new Map()
  // 记录当前只访问过一次元素的队列
  const queue = []

  for (let [i, ch] of Array.from(s).entries()) {
    // 没有访问过
    if (!visited.has(ch)) {
      visited.set(ch, i)
      queue.push([ch, i])
    } else {
      visited.set(ch, -1)
      // 队列的第一个只要访问过就出来
      while (queue.length && visited.get(queue[0][0]) === -1) {
        queue.shift()
      }
    }
  }

  return queue.length ? queue[0][0] : ' '
}
