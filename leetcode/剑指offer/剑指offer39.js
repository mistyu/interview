const majorityElement = nums => {
  // 结果数 — 非结果数 >= 1
  let count = 0
  let candidate = null

  for (num of nums) {
    if (count === 0) {
      candidate = num
    }
    count += (num === candidate) ? 1 : -1
  }

  return candidate
}