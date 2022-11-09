func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
  preListNode := &ListNode{}
  resListNode := preListNode
  for l1 != nil && l2 != nil {
    if l1.Val > l2.Val {
      preListNode.Next = l2
      l2 = l2.Next
    } else {
      preListNode.Next = l1
      l1 = l1.Next
    }
    preListNode = preListNode.Next
  }
  if l1 != nil {
    preListNode.Next = l1
  }
  if l2 != nil {
    preListNode.Next = l2
  }
  return resListNode.Next
}
