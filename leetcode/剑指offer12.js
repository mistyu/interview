const exist = (board, word) => {
  const rows = board.length
  const cols = board[0].length
  let res = false
  const visited = new Array(rows).fill(0).map(_i => new Array(cols).fill(false))
  // 初始化 visited
  const initVisited = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        visited[row][col] = false
      }
    }
  }
  // 查找是否符合条件
  const dfs = (row, col, visiteIndex) => {
    if (visiteIndex === word.length) {
      res = true
      return
    }
    if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col]) return
    if (board[row][col] === word[visiteIndex]) {
      visited[row][col] = true
      dfs(row, col + 1, visiteIndex + 1)
      dfs(row, col - 1, visiteIndex + 1)
      dfs(row + 1, col, visiteIndex + 1)
      dfs(row - 1, col, visiteIndex + 1)
    }
    visited[row][col] = false
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (res === true) return true
      initVisited()
      dfs(row, col, 0)
    }
  }

  return res ? res : false
}
