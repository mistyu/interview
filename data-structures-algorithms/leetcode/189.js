function rotate (nums, k) {
  const reverse = (nums, start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]]
      start++
      end--
    }
  }
  const len = nums.length
  const offset = k % len
  reverse(nums ,0, len - 1)
  reverse(nums, 0, offset - 1)
  reverse(nums, offset, len - 1)

  return nums
}
