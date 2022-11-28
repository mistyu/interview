function setZeroes (matrix) {
  const rows = matrix.length
  const cols = matrix[0].length
  // 记录哪些行需要变成 0
  const zeroRows = new Set()
  // 记录哪些列需要变成 0
  const zeroCols = new Set()

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === 0) {
        zeroRows.add(row)
        zeroCols.add(col)
      }
    }
  }
  // 把每一行变成 0
  for (const row of zeroRows) {
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = 0
    }
  }
  // 把每一列变成 0
  for (const col of zeroCols) {
    for (let row = 0; row < rows; row++) {
      matrix[row][col] = 0
    }
  }

  return matrix
}
