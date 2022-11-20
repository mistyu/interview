// async 函数实现原理 就是 Generator + 自动执行器
async function example(params) {
  // ...
  await 1
  // ...
}

// Generator 实现
function example(params) {
  return spawn(function *() {
    // ...
    yield 1
    // ...
  })
}
// 自动执行器函数
function spawn(genF) {
  return new Promise((reslove, reject) => {
    const gen = genF() // 迭代器

    function step(nextF) {
      let next
      try {
        next = nextF() // 第一次 next
      } catch (error) {
        return reject(error)
      }
      // 如果迭代器完成则返回最终结果
      if (next.done) {
        return reslove(next.value)
      }

      Promise.resolve(next.value).then((res) => {
        step(() => gen.next(res))
      }, (error) => {
        step(() => gen.throw(error))
      })
    }
    step(() => gen.next())
  }) 
}
