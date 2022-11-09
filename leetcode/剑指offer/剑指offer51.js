var reversePairs = function(nums) {
  // 记录有效的逆序对次数
  let total = 0
  // 归并排序
  const mergeSort = (nums, left, right) => {
    if (right - left < 2) return
    const mid = Math.ceil((left + right) / 2)
    mergeSort(nums, left, mid)
    mergeSort(nums, mid, right)
    merge(nums, left, mid, right)
  }


  const merge = (nums, left, mid, right) => {
    const leftArr = nums.slice(left, mid)
    const rightArr = nums.slice(mid, right)
    let leftI = 0
    let rightI = 0
    for (let i = left; i < right; i++) {
      if (leftI === leftArr.length) {
        nums[i] = rightArr[rightI]
        rightI++
      } else if (rightI === rightArr.length) {
        nums[i] = leftArr[leftI]
        leftI++
        // 每次左移一次 都加上 rightI（rightI左边的都算有效的逆序对）
        total += rightI
      } else if (leftArr[leftI] <= rightArr[rightI]) {
        nums[i] = leftArr[leftI]
        leftI++
        // 每次左移一次 都加上 rightI（rightI左边的都算有效的逆序对）
        total += rightI
      } else {
        nums[i] = rightArr[rightI]
        rightI++
      }
    }
  }
  mergeSort(nums, 0, nums.length)

  return total
}