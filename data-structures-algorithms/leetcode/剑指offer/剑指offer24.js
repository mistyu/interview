const reverseList = head => {
	let current = head
	let dummy = null

	while (current) {
		const nextNode = current.next
		current.next = dummy
		dummy = current
		current = nextNode
	}

	return dummy
}
