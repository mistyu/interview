function isValidSudoku (board) {
  const rows = board.length
  const cols = board[0].length
  let rowMemo
  const colMemo = new Array(rows).fill(0).map(() => new Set())
  let gridMemo

  for (let row = 0; row < rows; row++) {
    // 每一行都重置
    rowMemo = new Set()
    if (row % 3 === 0) {
      gridMemo = new Array(3).fill(0).map(() => new Set())
    }
    for (let col = 0; col < cols; col++) {
      // 这种情况不需要判断
      if (board[row][col] === '.') continue
      // 水平情况
      if (rowMemo.has(board[row][col])) {
        return false
      } else {
        rowMemo.add(board[row][col])
      }
      // 垂直情况
      if (colMemo[col].has(board[row][col])) {
        return false
      } else {
        colMemo[col].add(board[row][col])
      }
      // 9宫格情况
      if (gridMemo[~~(col / 3)].has(board[row][col])) {
        return false
      } else {
        gridMemo[~~(col / 3)].add(board[row][col])
      }
    }
  }

  return true
}