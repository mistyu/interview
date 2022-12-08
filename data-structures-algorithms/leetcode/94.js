function inorderTraversal (root) {
  // 左 -> 根 -> 右
  const roots = []

  function traverselRoot (root) {
      if (!root) return
      traverselRoot(root.left)
      roots.push(root.val)
      traverselRoot(root.right)
  }

  traverselRoot(root)

  return roots
}
