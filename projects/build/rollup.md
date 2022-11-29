## Rollup
> Rollup

### Rollup 插件
```js
export function myExample () {
  return {
    name: 'my-example', // 插件名字
    // 插件 build 前运行的钩子
    buildStart (options) {
      console.log(options /* 传入的 options 以及 默认的 options */)
    },
    // 可以做一些代码格式的更改
    load (id) {
      console.log('in load', id /* 文件的绝对路径 */)
      return null // 什么都不做
    },
    // 代码转换
    transform (code, id) {
      console.log('transform code', code /* 原代码 */)
      if (id.slice(-5) !== '.json') {
        return null // 什么都不做
      }
      try {
        const parsed = JSON.parse(code)
        const transformCode = dataToEsm(parsed) // 将 json 转化成 esm
        return {
          code: transformCode
        }
      } catch (err) {
        console.error(err)
      }
      return {
        code
      }
    },
    // build 之后
    buildEnd (error) {
      console.error(error)
    }
  }
}
```
