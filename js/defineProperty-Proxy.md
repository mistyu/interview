## Object.definePerporty 和 Proxy

### Object.definePerporty
> 静态方法object. defineproperty()直接在对象上定义新属性，或者修改对象上的现有属性，并返回对象

Object.defineProperty(obj,key,config)有三个参数，第一个参数是目标对象，第二个参数是目标对象的key,第三个参数是一个对象，其内部包含对对象属性key的增删改查配置。
```js
Object.defineProperty(obj, key, {
  value: xxx,
  writable: false, // 是否可修改，默认是false
  enumerable: false, // 是否可枚举，默认是false
  configurable: false // 是否可删除，默认是false
})
```

#### 对数组和对象的监听
* 对象的监听
```js
let obj = {
  name: 'mistyu',
  age: 27,
  a: {
    b: 1
  }
}

for (let key in obj ){
  let val = obj[key]
  Object.defineProperty(obj,key,{
    get(){
      console.log('get监听')
      return val
    },
    set(newVal){
      console.log('set监听')
      val = newVal
    }
  })
}
console.log(obj.name) // get 监听 mistyu
console.log(obj.age) // get 监听 27
console.log(obj.a.b) // get 监听 1
obj.name = 'xxx' //set 监听
obj.age = 1000 // set 监听
obj.a.b = 999 // 无法监听
```

#### 数组的监听
数组也属于对象，我们可以把数组的索引作为对象的key,因此我们也可以实现对数组的监听。同时我们注意到数组自带的部分方法在操作数组时无法被监听。

```js
let arr = [1,2,3]
arr.forEach((item,index)=>{
  Object.defineProperty(arr,index,{
    get(){
      console.log('get监听')
      return item
    },
    set(val) {
      console.log('set监听')
      item = val
    }
  })
})
console.log(arr[0]) // get 监听 1
arr[0] = 100 // set 监听
arr[3] = 300 // 没有的索引无法监听
arr.push(4) // 无法监听
```

#### Object.defineProperty 优点

1. 是ES5语法，对浏览器兼容性处理友好

#### Object.defineProperty 缺点

1. 对对象直接新增的属性，无法监听。
2. 对数组未监听的索引以及部分数组的方法，无法监听。
3. 对对象的深度监听，需要深度递归遍历整个对象，耗费性能。

### [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
> Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

#### 监听对象
```js
let obj = {
  name: 'mistyu',
  age: 22,
  a: {
    b: 1
  }
}
let p = new Proxy(obj,{
  get(o,key){
    console.log('get')
    return o[key]
  },
  set(o,key,val){
    console.log('set')
    o[key] = val
  },
})

console.log(p.name) // get dzp
console.log(p.age) // get 22
console.log(p.a.b) // get 1

p.name = 'xxx' // set
p.age = 99 // set
p.info = 'info' // set
p.a.b = 100 // 未触发 set
```
可以看到Proxy对对象的监听时，优势十分明显，给对象添加新属性时，proxy是可以拦截到。但是同时发现了一个问题，Porxy对对象默认是监听第一层，当第二层对象修改数据时是监听不到的，此时仍然需要借助递归完成对象深度监听

#### 监听数组
```js
let arr = [1,2,3]
let p = new Proxy(arr,{
  get(target,key){
    console.log('get')
    return target[key]
  },
  set(target,key,val){
    console.log('set')
    target[key] = val
  }
})
console.log(p[0]) // get
p[0] = 9 // set
p.push(4) // get get set
```
可以看到Porxy对数组的监听是十分优秀的，数组通过索引查询和修改，通过数组push等方法修改数组时都可以完美的监听到数组的改变(数组push为什么会触发多次get和set，这个和push底层源码有关系)

#### proxy优点
1. 完美的支持对数组各种方法和索引的拦截监听
2. 读对象新增属性支持拦截监听
3. vue3中基于proxy动态拦截的方式对对象深度监听，也就是一开始不会全部拦截对象每个属性，当我们访问/操作属性时才会动态的拦截具体属性。

#### Proxy缺点
1. ES6语法，存在部分浏览器兼容性问题。
