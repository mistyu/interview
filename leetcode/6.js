const convert = function(s, numRows) {
  if (numRows === 1) return s
  const memo = new Array(numRows).fill(0).map(() => ([]))
  let up = false
  let down = true
  let row = 0
  let col = 0

  for (let i = 0; i < s.length; i++) {
    if (row === numRows) {
      row--
      col++
      down = false
      up = true
    }
    if (down) {
      memo[row][col] = s[i]
      row++
    }
    if (up) {
      memo[row - 1][col] = s[i]
      row--
      if (row === 0) {
        // 还原
        row = 1
        up = false
        down = true
      } else {
        col++
      }
    }
  }
  let res = ''
  for (let i = 0; i < numRows; i++) {
    res += memo[i].join('')
  }

  return res
}
