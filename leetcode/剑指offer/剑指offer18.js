const deleteNode = function(head, val) {
  let count = new ListNode()
  count.next = head
  const dummy = count

  while (count && count.next) {
    if (count.next.val === val) {
      count.next = count.next.next
    }
    count = count.next
  }

  return dummy.next
}
