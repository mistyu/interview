function movingCount(m, n, k) {
  const rows = m
  const cols = n
  const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
  matrix[0][0] = 1
  let total = 1

  function getSum (num) {
    let sum = 0
    while (num) {
      sum += num % 10
      num = ~~(num / 10)
    }

    return sum
  }
  
  // 初始化第一行第一列
  for (let row = 1; row < rows; row++) {
    if (getSum(row) <= k && matrix[row - 1][0]) {
      matrix[row][0] = 1
      total++
    }
  }
  for (let col = 1; col < cols; col++) {
    if (getSum(col) <= k && matrix[0][col - 1]) {
      matrix[0][col] = 1
      total++
    }
  }
  
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      const sum = getSum(row) + getSum(col)
      if (sum <= k && (matrix[row - 1][col] || matrix[row][col - 1])) {
        total++
        matrix[row][col] = 1
      }
    }
  }

  return total
}
