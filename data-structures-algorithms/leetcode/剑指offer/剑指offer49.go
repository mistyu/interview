func getMinMum (num1 int, num2 int) int {
  if num1 < num2 {
    return num1
  }
  return num2
}

func nthUglyNumber(n int) int {
  // 初始化 dp
  dp := make([] int, n + 1)
  dp[1] = 1
  C2 := 1
  C3 := 1
  C5 := 1

  for i := 2; i <= n; i++ {
    num2 := dp[C2] * 2
    num3 := dp[C3] * 3
    num5 := dp[C5] * 5
    dp[i] = getMinMum(getMinMum(num2, num3), num5)

    if (dp[i] == num2) {
      C2++
    }
    if (dp[i] == num3) {
      C3++
    }
    if (dp[i] == num5) {
      C5++
    }
  }

  return dp[n]
}
