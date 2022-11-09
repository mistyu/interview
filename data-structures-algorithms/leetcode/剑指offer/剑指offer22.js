const getKthFromEnd = (head, k) => {
	let count = new ListNode()
	count.next = head
	let dummy = count

	for (let i = 0; i < k; i++) {
		count = count.next
	}

	while (count.next) {
		count = count.next
		dummy = dummy.next
	}
	
	return dummy.next
}
