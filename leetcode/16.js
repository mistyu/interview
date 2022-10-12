const threeSumClosest = (nums, target) => {
  nums.sort((a, b) => a - b)
  let diff = Number.MAX_SAFE_INTEGER
  let min = 0

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[left] + nums[right] + nums[i]
      if (sum === target) return target
      if (Math.abs(sum - target) < diff ) {
        diff = Math.abs(sum - target)
        min = sum
      }
      if (sum > target) {
        right--
        // 优化 重复的可以跳过
        while (left < right && nums[right] === nums[right + 1]) {
          right--
        }
      } else {
        left++
        // 优化 重复的可以跳过
        while (left < right && nums[left] === nums[left - 1]) {
          left++
        }
      }
    }
  }
  return min
}
