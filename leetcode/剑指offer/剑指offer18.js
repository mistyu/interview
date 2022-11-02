const deleteNode = function(head, val) {
  let current = new ListNode()
  current.next = head
  const dummy = current

  while (current && current.next) {
    if (current.next.val === val) {
      current.next = current.next.next
    }
    current = current.next
  }

  return dummy.next
}
