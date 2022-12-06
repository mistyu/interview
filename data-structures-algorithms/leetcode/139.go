func wordBreak(s string, wordDict []string) bool {
	wordMap := make(map[string]bool)
	for _, word := range wordDict {
		wordMap[word] = true
	}

	// 记录每个位置是否符合条件
	memo := make([]bool, len(s) + 1)
	memo[0] = true

	for i := 1; i <= len(s); i++ {
		for j := 0; j < i; j++ {
			if (memo[j] && wordMap[s[j:i]]) {
				memo[i] = true
				break
			}
		}
	}

	// 最后返回最后一个位置是否符合条件即可
	return memo[len(s)]
}
