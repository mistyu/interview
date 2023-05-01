func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummy := &ListNode{0, head}
	cur := dummy
	res := dummy
	for i := 0; i < n; i++ {
		dummy = dummy.Next
	}
	for dummy.Next != nil {
		dummy = dummy.Next
		cur = cur.Next
	}
	cur.Next = cur.Next.Next
	
	return res.Next
}
