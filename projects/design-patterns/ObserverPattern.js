//  当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知，这就是观察者模式
// 在观察者模式中，只有两种主体：目标对象 (Object) 和 观察者 (Observer)
// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }

  update(task) {
    console.log(this.name + ' 要 ' + task)
  }
}
// 主题
class Subject {
  constructor() {
    this.ObserverList = []
  }
  addObsever(observer) {
    this.ObserverList.push(observer)
  }
  notify(task) {
    this.ObserverList.forEach(ob => ob.update(task))
  }
}

const subject = new Subject()
const ob1 = new Observer('ob1')
subject.addObsever(ob1)
subject.notify('study')

// Vue2 响应式基于此实现

class Dep {
  constructor () {
    this.dep = []
  }
  update () {
    this.dep.forEach(d => {
      d.notify()
    })
  }
}

class Watcher {
  constructor () {
    this.fns = []
  }

  notify (...args) {
    this.fns.forEach(fn => {
      fn(...args)
    })
  }
}

const dep = new Dep()
const watcher = new Watcher()
dep.add(watcher)
