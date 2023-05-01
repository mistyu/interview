function exist (board, word) {
  const rows = board.length
  const cols = board[0].length
  let isMatch = false
  // 用来记录哪些位置是访问过的
  const visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false))
  // 重置访问记录
  const isMatchetViested = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        visited[row][col] = false
      }
    }
  }
  const backtrack = (row, col, len) => {
    if (len === word.length || isMatch) {
      isMatch = true
      return
    }
    // 超出边界以及访问过的位置不需要在 backtrack 了
    if (row < 0 || col < 0 || len >= word.length || row >= rows || col >= cols || visited[row][col]) {
        return
    }
    // 这个位置访问过了
    visited[row][col] = true
    if (board[row][col] === word[len]) {
      backtrack(row + 1, col, len + 1)
      backtrack(row - 1, col, len + 1)
      backtrack(row, col + 1, len + 1)
      backtrack(row, col - 1, len + 1)
    }
    // 每次执行完都要去除这个位置都访问记录
    visited[row][col] = false
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (isMatch) return isMatch
      // 每次都得重置访问记录
      isMatchetViested()
      // 开始 backtrack
      backtrack(row, col, 0)
    }
  }

  return isMatch
}
