var coinChange = function(coins, amount) {
	const rows = coins.length + 1
	const cols = amount + 1
	// 初始化
	const dp = new Array(rows).fill(0).map(() => new Array(cols).fill(cols))
	dp[0][0] = 0

	for (let row = 1; row < rows; row++) {
		dp[row][0] = 0
		for (let col = 1; col < cols; col++) {
			dp[row][col] = dp[row - 1][col]
			if (col >= coins[row - 1]) {
				dp[row][col] = Math.min(1 + dp[row][col - coins[row - 1]], dp[row][col])
			}
		}
	}

	return dp[rows - 1][cols - 1] === cols ? -1 : dp[rows - 1][cols - 1]
}