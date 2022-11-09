const validateStackSequences = (pushed, popped) => {
  const stack = []
  const count = pushed.length + popped.length
  for (let i = 0; i < count; i++) {
    if (stack[stack.length - 1] === popped[0]) {
      stack.pop()
      popped.shift()
    } else {
      stack.push(pushed.shift())
    }
  }

  return !stack.length
}
