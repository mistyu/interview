// 基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象
// 发布订阅模式与观察者模式相比，发布订阅模式中有三个角色，发布者 Publisher ，事件调度中心 Event Channel ，订阅者 Subscriber

class PubSub {
  constructor() {
    // 事件中心
    this.events = Object.create(null)
  }
  // 订阅者
  subscribe(type, callback) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(callback)
  }
  // 发布
  publish(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback.call(this, ...args))
    }
  }
  oncePublist(type, callback) {
    const cb = function (...args) {
      callback.call(this, ...args)
      this.unSubscribe(type, cb)
    }
    cb.subscribe(type, cb)
  }
  // 取消订阅
  unSubscribe(type, callback) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(cb => cb !== callback)
    }
  }
  unSubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type]
    }
  }
}

const pubSub = new PubSub()
pubSub.subscribe('name', (name) => {
  console.log('name' + ' is ' + name)
})
pubSub.subscribe('age', (age) => {
  console.log('age' + ' is ' + age)
})
pubSub.publish('name', 'c')
pubSub.publish('age', '16')
pubSub.unSubscribeAll('name')
pubSub.unSubscribeAll('age')
pubSub.publish('name', 'c')
pubSub.publish('age', '16')
// EventBus 基于此实现