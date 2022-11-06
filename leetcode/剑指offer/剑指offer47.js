const maxValue = grid => {
  if (grid.length === 0) return 0
  if (grid[0].length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length
  const dp = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
  dp[0][0] = grid[0][0]

  // 初始化第一行、第一列
  for (let col = 1; col < cols; col++) {
    dp[0][col] = dp[0][col - 1] + grid[0][col]
  }
  for (let row = 1; row < rows; row++) {
    dp[row][0] = dp[row - 1][0] + grid[row][0]
  }

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1])  + grid[row][col]
    }
  }

  return dp[rows - 1][cols - 1]
}
