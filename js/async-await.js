// async 函数实现原理 就是 Generator + 自动执行器(co) + Promise
function co (gen) {
  return new Promise((resolve, reject) => {
    function step (data) {
      let { value, done } = gen.next(data)
      if (!done) {
        Promise.resolve(value).then(data => {
          step(data)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(value)
      }
    }
    step()
  })
}

function* resolveGen() {
  try {
    let r1 = yield 'hello'
    console.log(r1)
    let r2 = yield 'world'
    console.log(r2)
  } catch (error) {
    console.log(error)    
  }
}

co(resolveGen()).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
