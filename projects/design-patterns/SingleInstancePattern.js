// 单例模式顾名思义保证一个类仅有一个实例，并且提供一个访问它的全局访问点

const CreateSingleInstance = function (fn) {
  let _instance = null
  return function (...args) {
    return _instance || (_instance = fn.call(this, ...args))
  }
}

// Vue框架中生使用的new Vue就应用了单例模式