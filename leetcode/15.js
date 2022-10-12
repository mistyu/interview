const threeSum = nums => {
  nums.sort((a, b) => a - b)
  const res = []

  for (let i = 0; nums[i] <= 0; i++) {
    if (i !== 0 && nums[i] === nums[i - 1]) continue
    let left = i + 1
    let right = nums.length - 1
    const diff = 0 - nums[i]
    while (left < right) {
      const sum = nums[left] + nums[right]
      if (sum < diff) {
        left++
      } else if (sum > diff) {
        right--
      } else {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
        while (left < right && nums[left] === nums[left - 1] && nums[right] === nums[right + 1]) {
          left++
          right--
        }
      }
    }
  }

  return res
}
