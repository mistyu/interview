func uniquePaths(m int, n int) int {
	memo := make([][]int, m)

	for i := 0; i < m; i++ {
		memo[i] = make([]int, n)
		memo[i][0] = 1
	}
	for j := 0; j < n; j++ {
		memo[0][j] = 1
	}

	for row := 1; row < m; row++ {
		for col := 1; col < n; col++ {
			memo[row][col] = memo[row - 1][col] + memo[row][col - 1]
		}
	}
	
	return memo[m-1][n-1]

}
