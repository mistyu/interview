func change(amount int, coins []int) int {
	rows := len(coins) + 1
	cols := amount + 1
	// 初始化
	dp := make([][] int, rows)
	for row := 0; row < rows; row++ {
		dp[row] = make([] int, cols)
	}

	for row := 1; row < rows; row++ {
		dp[row][0] = 1
		for col := 1; col < cols; col++ {
			// 不包括这次硬币的种数
			dp[row][col] = dp[row - 1][col]
			if col >= coins[row - 1] {
				// 不包括这次硬币的种数 + 包括这次硬币的种数
				dp[row][col] = dp[row - 1][col] + dp[row][col - coins[row - 1]]
			}
		}
	}

	return dp[rows - 1][cols - 1]
}
