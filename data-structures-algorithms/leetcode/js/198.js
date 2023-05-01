function rob (nums) {
  const len = nums.length
  const maxMoneys = new Array(len).fill(0)

  maxMoneys[0] = nums[0]
  maxMoneys[1] = Math.max(nums[1], nums[0])

  for (let i = 2; i < len; i++) {
    maxMoneys[i] = Math.max(maxMoneys[i - 1], maxMoneys[i - 2] + nums[i])
  }

  return maxMoneys[len - 1]
}
