var spiralOrder = function(matrix) {
  if (matrix.length === 0) return []
  const res = []

  const rows = matrix.length
  const cols = matrix[0].length

  let row = 0
  let col = 0
  let direction = 'right' // 方向
  // 记录已经走过的行和列
  let minRow = 0
  let maxRow = rows - 1
  let minCol = 0
  let maxCol = cols - 1

  for (let i = 0; i < rows * cols; i++) {
    res[i] = matrix[row][col]
    switch (direction) {
      case 'right':
        if (col === maxCol) {
          direction = 'down'
          minRow++
          row++
        } else {
          col++
        }
        break
      case 'down':
        if (row === maxRow) {
          direction = 'left'
          maxCol--
          col--
        } else {
          row++
        }
        break
      case 'left':
        if (col === minCol) {
          direction = 'up'
          maxRow--
          row--
        } else {
          col--
        }
        break
      case 'up':
        if (row === minRow) {
          direction = 'right'
          minCol++
          col++
        } else {
          row--
        }
        break
    }
  }

  return res
}
