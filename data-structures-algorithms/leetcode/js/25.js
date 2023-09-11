const reverseKGroup = (head, k) => {
  // 指定位置反转链表
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

  let step = 0
  let cnt = 1

  let dummy = head
  let resNode = head

  while (dummy.next) {
    dummy = dummy.next
    cnt++
  }

  cnt = ~~(cnt / k)

  while (step < cnt) {
    resNode = reverseList(resNode, step * k + 1, step * k + k)
    step++
  }

  return resNode
}