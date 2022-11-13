function sumNums (n) {
	const dp = new Array(n + 1).fill(0)

	for (let i = 1; i <= n; i++) {
		dp[i] = dp[i - 1] + i
	}

	return dp[n]
}
