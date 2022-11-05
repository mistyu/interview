const findNumberIn2DArray = (matrix, target) => {
  // 从左下角开始
  let bottom = matrix.length - 1
  let left = 0

  while (bottom >= 0 && left < matrix[0].length) {
    const current = matrix[bottom][left]
    if (current === target) return true
    else if (current < target) left++
    else bottom--
  }

  return false
}
