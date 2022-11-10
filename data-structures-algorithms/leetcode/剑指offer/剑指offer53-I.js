var search = function(nums, target) {
  const binarySearch = (nums, target, isLeft) => {
    let left = 0
    let right = nums.length - 1
    if (isLeft) {
      while (left <= right) {
        const mid = ~~((right - left) / 2 + left)
        if (nums[mid] < target) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    } else {
      while (left <= right) {
        const mid = ~~((right - left) / 2 + left)
        if (nums[mid] <= target) {
        left = mid + 1
        } else {
        right = mid - 1
        }
      }
    }
    return left
  }

  const left = binarySearch(nums, target, true)
  const right = binarySearch(nums, target, false)

  return right - left
}
