// const getTime = () => (new Date()).getTime()

// const sleep = delay => {
//   const startTime = getTime()

//   while (getTime() - startTime < delay) {
//     continue
//   }

//   return true
// }

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
