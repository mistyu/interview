const data = {
  valueOf: () => 123,
  toString: () => 'abc'
}

console.log(data == 123) // true
console.log(data === 123) // false
console.log(`${data}` === 'abc') // true
console.log(data + '' === 'abc') // false


// valueOf 设置 data 返回该对象的原始值 123
// toString 设置 data 返回该字符串 'abc'
// 非严格相等时，调用 valueOf 获取原始值来判断
// `${data}` 是把 data 转化的字符串表示出来 调用 toString
// data + '' 调用 valueOf 获取原始值


// 详细情况可参考 mdn 或者 https://www.cnblogs.com/liutianzeng/p/10859000.html