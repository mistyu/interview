var search = function(nums, target) {
  // 二分法
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    // >> 1 相当于除以2向下取整
    let mid = (left + right) >> 1

    if (nums[mid] === target) {
      return mid
    }

    // 如果中间数小于最右边数，则右半段是有序的
    // 如果中间数大于最右边数，则左半段是有序的
    if (nums[mid] < nums[right]) {
      // 判断target是否在(mid, right]之间
      if (nums[mid] < target && target <= nums[right]) {
        // 如果在，则中间数右移即 left 增大
        left = mid + 1
      } else {
        // 如果不在，则中间数左移即 right 减小
        right = mid - 1
      }
    } else {
      // [left, mid)
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
  }

  return -1
}
