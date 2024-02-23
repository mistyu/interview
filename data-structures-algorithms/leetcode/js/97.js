var isInterleave = function(s1, s2, s3) {
  const s1Len = s1.length
  const s2Len = s2.length
  const s3Len = s3.length
  if (s3Len !== s1Len + s2Len) {
    return false
  }
  const dp = Array.from(new Array(s1Len + 1), () => new Array(s2Len + 1).fill(false))
  dp[0][0] = true
  for (let row = 0; row <= s1Len; row++) {
    for (let col = 0; col <= s2Len; col++) {
      const l = row + col - 1
      if (row > 0) {
        dp[row][col] = (dp[row - 1][col] && s1[row - 1] === s3[l])
      }
      if (col > 0) {
        dp[row][col] = dp[row][col] || (dp[row][col - 1] && s2[col - 1] === s3[l])
      }
    }
  }
  return dp[s1Len][s2Len]
};
