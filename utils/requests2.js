async function sendRequest(requestList,limits,callback){
  // 维护一个promise队列
  const promises = []
  // 当前的并发池,用Set结构方便删除
  const pool = new Set() // set也是Iterable<any>[]类型，因此可以放入到race里
  // 开始并发执行所有的任务
  for(let request of requestList){
    // 开始执行前，先await 判断 当前的并发任务是否超过限制
    if(pool.size >= limits){
      // 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行
      await Promise
        .race(pool)
        .catch(err=>err)
    }

    const promise = request()// 拿到promise

    // 删除请求结束后，从pool里面移除
    const cb = () => {
      pool.delete(promise)
    }
    // 注册下then的任务
    promise.then(cb,cb)
  
    pool.add(promise)
    promises.push(promise)
  }

  // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
  // 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if)
  Promise.allSettled(promises).then(callback,callback)
}
