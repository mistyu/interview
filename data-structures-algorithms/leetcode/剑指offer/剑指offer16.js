const myPow = (x, n) => {
  if (n === 0) return 1
  if (n === 1) return x
  if (n === -1) return 1/x
  
  let res
  
  if (n % 2) {
    res = myPow(x, (n - 1) / 2)
    return res * res * x
  } else {
    res = myPow(x, n / 2)
    return res * res
  }
}
