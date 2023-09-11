const reverseList = (head, left, right) => {
  let dummy = new ListNode()
  const resNode = dummy
  dummy.next = head
  let current = dummy
  let cnt = right - left + 1
  // 尾部节点
  let tail = null
  // 反转 n 位节点
  const reverse = (head, n) => {
    let dummy = null
    let current = head
    while (n--) {
      const next = current.next
      current.next = dummy
      dummy = current
      current = next
    }
    tail = current
    return dummy
  }

  while (--left) {
    current = current.next
  }
  
  current.next = reverse(current.next, cnt)

  while (dummy.next) {
    dummy = dummy.next
  }
  // 接上尾部节点
  dummy.next = tail

  return resNode.next
}
