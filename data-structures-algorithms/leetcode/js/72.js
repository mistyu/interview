var minDistance = function (word1, word2) {
  const rows = word1.length
  const cols = word2.length
  const dp = Array.from(new Array(rows + 1), () => new Array(cols + 1).fill(0))
  for (let row = 0; row <= rows; row++) {
    dp[row][0] = row
  }
  for (let col = 0; col <= cols; col++) {
    dp[0][col] = col
  }
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (word1[row - 1] === word2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1]
      } else {
        dp[row][col] = Math.min(dp[row - 1][col - 1], dp[row - 1][col], dp[row][col - 1]) + 1
      }
    }
  }
  return dp[rows][cols]
};
