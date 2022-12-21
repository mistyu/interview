# Node 中的 EventLoop

* timers: 执行 setTimeout 与 setInterval 回调
* pendding callbacks: 执行系统操作的回调，例如 tcp, upd
* idle, parpare: 只在系统内部调用
* poll: 执行与 I/O 相关的回调
* check: 执行 setImmediate 的回调
* close callbacks: 执行 close 事件的回调

1. 首先会执行同步代码，将不同的任务添加到相应的的队列中
2. 同步代码执行完成后，会去执行满足条件的微任务 
3. timer 中的所有宏任务执行完成后就会依次切换队列
tips: 在完成队列切换前都会情况微任务代码

process.nextTick() 的微任务优先级最高