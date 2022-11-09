const cuttingRope = n => {
  const dp = new Array(n + 1).fill(BigInt(1))

  const getMaxNum = (num1, num2, num3) => {
    let res = num1
    if (num2 > num1) {
      res = num2
      if (num3 > num2) {
        res = num3
      }
    }
    if (num3 > num1) {
      res = num3
      if (num2 > num3) {
        res = num2
      }
    }

    return res
  }

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = getMaxNum(dp[i], dp[i - j] * BigInt(j), BigInt((i - j) * j))
    }
  }

  return dp[n] % (1000000007n)
}
