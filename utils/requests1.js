class Requests {
  constructor (limit, maxRetryNums) {
    // 同时多少个
    this.limit = limit
    // 请求队列
    this.requests = []
    // 最大重试失败数量
    this.maxRetryNums = maxRetryNums
    // 当前并发数量
    this.currentNums = 0
    // 当前失败次数
    this.retryNums = 0
    // 是否完成
    this.isOver = false
  }

  request (r) {
    // 重置 isOver
    if (this.isOver) {
      this.isOver = false
    }
    const rObj = {
      r,
      // 当前失败数量
      isRetry: false
    }
    this.requests.push(rObj)
  }

  async run () {
    const rObj = this.requests.shift()
    try {
      ++this.currentNums
      await rObj.r()
      if (rObj.isRetry) {
        --this.retryNums
      }
    } catch (error) {
      rObj.risRetry = true
      this.requests.unshift(rObj)
      ++this.retryNums
      // 超过最大失败数量
      if (this.retryNums >= this.maxRetryNums) {
        this.isOver = true
        this.requests = []
      }
    } finally {
      --this.currentNums
      if (this.requests.length > 0) {
        !this.isOver && this.run()
      }
    }
  }
}

// how to use
const fn = (i) => {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i)
    }, 1000)
  })
}

const requests = new Requests(3, 4)
for (let i = 0; i < 10; i++) {
  requests.request(fn(i))
}

const test = async () => {
  try {
    await requests.run()
  } catch (error) {
    console.log(error)
  }
}

test()
