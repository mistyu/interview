var findNthDigit = function(n) {
  if (n < 10) return n
  // 几位数的最大长度
  const getNumCount = (digit) => {
    let total = 10
    while (digit > 1) {
      total += digit * 9 * (10 ** (digit - 1))
      digit--
    }
    return total
  }
  // 先找到是几位数里面的
  const getDigit = (n) => {
    let left = 1
    let right = 9

    while (left <= right) {
      if (getNumCount(left) === n) return left
      if (getNumCount(right) === n) return right
      if (getNumCount(right) > n) {
        right--
      } else if (getNumCount(left) < n) {
        left++
      }
    }
    return left
  }

  // 获取第几位数字
  const getNumber = (number, index, digit) => {
    return ~~(number % (10 ** (digit + 1 - index)) / (10 ** (digit - index)))
  }
  // 是几位数
  const digit = getDigit(n)
  // 几位数里的第几个
  const restNum = ~~((n - getNumCount(digit - 1)) / digit)
  // 结果数
  const number = 10 ** (digit - 1) + restNum
  // 结果数里的第几位
  const rest = (n - getNumCount(digit - 1)) % digit

  return getNumber(number, rest + 1, digit)
}
