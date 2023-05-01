const mergeKLists = lists => {
  // 两两合并处理即可
  const mergeTwoLists = (list1, list2) => {
    let l1 = list1
    let l2 = list2
    let current = new ListNode()
    const dummy = current

    while (l1 && l2) {
      if (l1.val > l2.val) {
        current.next = l2
        l2 = l2.next
      } else {
        current.next = l1
        l1 = l1.next
      }
      current = current.next
    }

    if (l1) {
      current.next = l1
    }

    if (l2) {
      current.next = l2
    }

    return dummy.next
  }

  let dummy = new ListNode()
  dummy = dummy.next
  
  for (let i = 0; i < lists.length; i++) {
    dummy = mergeTwoLists(dummy, lists[i])
  }

  return dummy
}
