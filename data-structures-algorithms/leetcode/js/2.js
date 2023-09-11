function addTwoNumbers(l1, l2) {
  // 设置 head tail 链表 为 null
  let head = null, tail = null
  // 记录是否大于 10
  let carry = 0
  // l1 l2 都遍历完了
  while (l1 || l2) {
    // l1 还没遍历完 n1 = l1.val 遍历完了 则为 0
    const n1 = l1 ? l1.val : 0
    // l2 还没遍历完 n2 = l2.val 遍历完了 则为0
    const n2 = l2 ? l2.val : 0
    // 计算 sum
    const sum = n1 + n2 + carry
    // 第一次 将 head tail 为链表节点为 sum % 10
    if (!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      // tail.next 的值
      tail.next = new ListNode(sum % 10)
      tail = tail.next
    }
    // 记录每次 carry
    carry = Math.floor(sum / 10)
    // 如果 l1 还存在 指向下一个节点
    if (l1) {
      l1 = l1.next
    }
    // 如果 l2 还存在 指向下一个节点
    if (l2) {
      l2 = l2.next
    }
  }
  // 如果 l1 l2 都遍历完了 最后两个值相加大于 10 继续创建下一个节点为 carry
  if (carry > 0) {
    tail.next = new ListNode(carry)
  }
  // 返回 head (指向第一个节点)
  return head
}
