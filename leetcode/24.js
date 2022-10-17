const swapPairs = head => {
  let dummy = new ListNode()
  const resNode = dummy
  dummy.next = head
  while(dummy.next && dummy.next.next) {
    let next = dummy.next
    let nextN = dummy.next.next
    let nextNN = dummy.next.next.next
    dummy.next = nextN
    nextN.next = next
    next.next = nextNN

    dummy = dummy.next.next
  }

  return resNode.next
}
