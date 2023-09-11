func reverseList(head *ListNode) *ListNode {
  current := head
  // 声明 dummy 是 ListNode 类型
  var dummy *ListNode

  for current != nil {
    // next := current.Next
    // current.Next = prev
    // prev = current
    // current = next
    dummy, current.Next, current = current, dummy, current.Next
  }

  return dummy
}
