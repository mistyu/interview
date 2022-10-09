const isMatch = (s, p) => {
  const rows = p.length
  const cols = s.length
  const dp = new Array(rows + 1).fill(0).map(i => (new Array(cols + 1).fill(false)))
  dp[0][0] = true
  // 初始化 s 为空的情况
  for (let row = 1; row <= rows; row++) {
    if (p[row - 1] === '*') dp[row][0] = dp[row - 2][0]
  }
  
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (p[row - 1] === s[col - 1] || p[row - 1] === '.') {
        dp[row][col] = dp [row - 1][col - 1]
      } else {
        if (p[row - 1] === '*') {
          dp[row][col] = dp[row - 2][col] || dp[row - 1][col]
          if (p[row - 2] === s[col - 1]) {
            dp[row][col] = dp[row][col - 1] || dp[row][col]
          }
          if (p[row - 2] === '.') {
            dp[row][col] = dp[row - 2][col] || dp[row][col - 1]
          }
        }
      }
    }
  }
  return dp[rows][cols]
}
