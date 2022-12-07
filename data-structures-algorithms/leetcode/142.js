function detectCycle (head) {
  let fastNode = head
  let slowNode = head
  // 先判断是否成环
  do {
    // 不成环
    if (!fastNode || !fastNode.next) {
      return null
    }
    fastNode = fastNode.next.next
    slowNode = slowNode.next
      
  } while (fastNode !== slowNode)
  
  fastNode = slowNode = head
  // 找到第一次相遇点
  do {
    fastNode = fastNode.next.next
    slowNode = slowNode.next
  } while (fastNode !== slowNode)

  fastNode = head
  while (fastNode !== slowNode) {
    fastNode = fastNode.next
    slowNode = slowNode.next
  }

  return slowNode
}