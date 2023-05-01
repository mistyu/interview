func isValid(s string) bool {
	// c := make(map[string]string, 3)
	// c[")"] = "("
	// c["]"] = "["
	// c["}"] = "{"
	if len(s) % 2 == 1 {
		return false
	}
	m := map[byte]byte{
		')': '(',
		']': '[',
		'}': '{',
	}
	// 切片
	stack := make([]byte, 0)
	for  i := 0; i < len(s); i++ {
		if r, ok := m[s[i]]; ok {
			if len(stack) == 0 || stack[len(stack) - 1] != r {
				return false
			}
			stack = stack[:len(stack)-1]
		} else {
			stack = append(stack, s[i])
		}
	}

	return len(stack) == 0
}
