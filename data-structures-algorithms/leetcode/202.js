function getNext (n) {
  return n.toString()
    .split('')
    .map(i => i ** 2)
    .reduce((a, b) => a + b)
}
function isHappy (n) {
  let slow = n
  let fast = n
  do {
    slow = getNext(slow);
    fast = getNext(getNext(fast))
  } while(fast !== 1 && fast !== slow)

  return fast === 1
}
