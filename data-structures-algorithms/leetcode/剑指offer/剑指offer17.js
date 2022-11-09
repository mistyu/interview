const printNumbers = n => {
  const maxNum = 10 ** n
  const res = []

  for (let i = 1; i < maxNum; i++) {
    res.push(i)
  }

  return res
}
