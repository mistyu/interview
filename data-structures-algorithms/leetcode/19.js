const removeNthFromEnd = function(head, n) {
  // 初始化一条空链表 dummy 并且 next 指向 head
  let dummy = new ListNode()
  dummy.next = head
  // 复制两条 head 链表 先让其中一条 next n 次 在一起 next 另一条链表节点即到达 n 节点
  let n1 = dummy
  let n2 = dummy
  for (let i = 0; i < n; i++) {
    n1 = n1.next
  }

  while (n1.next !== null) {
    n1 = n1.next
    n2 = n2.next
  }

  n2.next = n2.next.next
  return dummy.next
}