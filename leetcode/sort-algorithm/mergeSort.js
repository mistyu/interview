// 归并排序
const mergeSort = (nums, left, right) => {
  // 直到数组内只有一项为止
  if (right - left < 2) return
  const mid = Math.ceil((left + right) / 2)
  // 拆分数组
  mergeSort(nums, left, mid)
  mergeSort(nums, mid, right)
  // 合并排序拆分好的数组并
  merge(nums, left, mid, right)
}
// 合并两个排好序的数组
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
    } else if (leftArr[leftI] < rightArr[rightI]) {
      nums[i] = leftArr[leftI]
      leftI++
    } else {
      nums[i] = rightArr[rightI]
      rightI++
    }
  }
}

const nums = [5, 7, 9, 6, 7, 8]

mergeSort(nums, 0, nums.length)
console.log(nums) // [ 5, 6, 7, 7, 8, 9 ]
