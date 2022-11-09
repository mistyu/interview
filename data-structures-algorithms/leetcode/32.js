const longestValidParentheses = s => {
  if (s.length < 2) return 0

  const stack = [-1]
  let res = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length) {
        res = Math.max(i - stack[stack.length - 1], res)
      } else {
        stack.push(i)
      }
    }
  }

  return res
}
