var translateNum = function(num) {
  if (num < 10) return 1

  const str = String(num)
  const dp = []
  // 初始化 dp
  dp[0] = 1
  const isOnlyOne = (str1, str2) => {
    if (Number(str1) > 2 || Number(str1) === 2 && Number(str2) > 5 || Number(str1) === 0) return true
    return false
  }
  if (isOnlyOne(str[0], str[1])) {
    dp[1] = 1
  } else {
    dp[1] = 2
  }

  for (let i = 2; i < str.length; i++) {
    if (isOnlyOne(str[i-1], str[i])) {
      dp[i] = dp[i - 1]
    } else {
      dp[i] = dp[i - 1] + dp[i - 2]
    }
  }
  
  return dp[str.length - 1]
}