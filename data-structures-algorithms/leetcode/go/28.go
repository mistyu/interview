func strStr(haystack string, needle string) int {
	if len(haystack) < len(needle) {
		return -1
	}
	if len(needle) == 0 {
		return 0
	}

	idx := 0

	for i := 0; i < len(haystack); i++ {
		if haystack[i] == needle[idx] {
			idx++
			if idx == len(needle) {
				return i - idx + 1
			}
		} else {
			if idx != 0 {
				i = i - idx
				idx = 0
			}
		}
	}

	return - 1
}
