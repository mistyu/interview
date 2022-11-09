var getIntersectionNode = function(headA, headB) {
  // headA 的长度
  let len1 = 1
  // headB 的长度
  let len2 = 1
  let dummy1 = headA
  let dummy2 = headB

  while (dummy1) {
    dummy1 = dummy1.next
    len1++
  }
  while (dummy2) {
    dummy2 = dummy2.next
    len2++
  }
  // 重置
  dummy1 = headA
  dummy2 = headB
  let diffLen = len1 - len2
  // 让长的链表先走一部分距离
  if (diffLen > 0) {
    while (diffLen) {
      dummy1 = dummy1.next
      diffLen--
    }
  } else {
    while (diffLen) {
      dummy2 = dummy2.next
      diffLen++
    }
  }
  // 找到第一个公共节点
  while (dummy1 && dummy2) {
    const node1 = dummy1
    const node2 = dummy2

    if (node1 === node2) return node1

    dummy1 = dummy1.next
    dummy2 = dummy2.next
  }

  return null
}