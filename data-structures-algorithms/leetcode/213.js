function rob (nums) {
  const len = nums.length
  if (len === 1) return nums[0]
  // 只偷最后一家或者只偷第一家
  const getMaxMoney = (moneys) => {
    const len = moneys.length
    const maxMoneys = new Array(len).fill(0)

    maxMoneys[0] = moneys[0]
    maxMoneys[1] = Math.max(moneys[1], moneys[0])

    for (let i = 2; i < len; i++) {
      maxMoneys[i] = Math.max(maxMoneys[i - 1], maxMoneys[i - 2] + moneys[i])
    }

    return maxMoneys[len - 1]
  }

  return Math.max(getMaxMoney(nums.slice(0, len - 1)), getMaxMoney(nums.slice(1, len)))
}
