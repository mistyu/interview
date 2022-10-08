const isPalindrome = x => {
  if (x < 0) return false
  if (x < 10) return true
  // 双指针逐位判断
  let right = 1
  // 初始化 x 的是几位数
  let left = 0
  let sum = x
  // 只要 sum 还大于 等于 1 说明至少还剩一位数
  while (sum >= 1) {
    sum /= 10
    left++
  }
  // 获取第几位数的值
  let getNumber = function (x, n) {
    // 取得 x 第 n 位数上的值
    return Math.floor(x % Math.pow(10, n) / Math.pow(10, n - 1))
  }
  // 只要 从左指针 大于 右指针就继续遍历  因为是回文数的话只需要遍历 长度的 1 / 2
  while (left > right) {
    if (getNumber(x, left) !== getNumber(x, right)) return false
    right++
    left--
  }
  return true
}

// 数字反转对比
const isPalindrome = x => {
  if (x < 0) return false

  const reverse = num => {
    let res = 0
    while (num !== 0) {
      res = res * 10 + num % 10
      num = Math.floor(num / 10)
    }
    return res
  }
  let y = x
  return reverse(y) === x
}