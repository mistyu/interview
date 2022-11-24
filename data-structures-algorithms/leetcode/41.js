function firstMissingPositive (nums) {
  const len = nums.length
  
  // 如果存在负数，那么答案就在 1 - len 之间
  for (let i = 0; i < len; i++) {
    if (nums[i] <= 0) {
      nums[i] = len + 1
    }
  }
  // 把 1 - len 索引位置上的数都打上标记(转为负数，这些都不是答案)
  for (let i = 0; i < len; i++) {
    const x = Math.abs(nums[i]) // 因为之前可能被打上标记了，所以需要取绝对值
    if (x >= 1 && x <= len) {
      nums[x - 1] = nums[x - 1] < 0 ? nums[x - 1] : -nums[x - 1]
    }
  }
  // 第一个没被打上标记(大于0)的就是答案
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) {
      return i + 1
    }
  }

  return len + 1
}
