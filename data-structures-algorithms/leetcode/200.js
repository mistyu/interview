function numIslands (grid) {
  let islandcount = 0
  
  function dfs (row, col) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === '0') return

    grid[row][col] = '0'
    dfs(row, col-1)
    dfs(row, col+1)
    dfs(row-1, col)
    dfs(row+1, col)
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === '1') {
        islandcount++
        dfs(row, col)
      }
        
    }
  }

  return islandcount
}
