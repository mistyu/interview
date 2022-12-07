## Vite
> 它基于 ECMAScript 标准原生模块系统 (ES Modules) 实现

### vite serve
不需要打包编译文件，模块的编译会在服务端处理，然后把编译的结果返回给浏览器（按需编译）

#### 实现原理
1. 将 import { createApp } from 'vue' 转换成 import vue from '@modules/vue.js' 
```js
const streamToString = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
    stream.on('error', reject)
  })
}
const stringToStream = text => {
  const stream = new Readable()
  stream.push(text)
  // 标识这个流写完了
  stream.push(null)
  return stream
}
// 加载第三方模块
app.use(async (ctx, next) => {
  // ctx.path -> /@modules/xxx
  if (ctx.path.startWith('/@modules')) {
    const moduleName = ctx.path.substr(10)
    const pkgPath = path.join(process.cwd(), 'node_modules', moduleName, 'package.json')
    const pkg = require(pkgPath)
    ctx.path = path.join('./node_modules', moduleName, pkg.module)
  }
  await next()
})
// 处理单文件组件
app.use(async (ctx, next) => {
  if (ctx.path.endsWith('.vue')) {
    const contents = await streamToString(ctx.body)
    const { descriptor } = compilerSFC.parse(contents)
    let code
    if (!ctx.query.type) {
      code = descriptor.script.content
      code = code.replace(/export\s+default\s+/g, 'const __script = ')
      code += `
        import { render as __render } from '${ctx.path}?type=template'
        __script.render = __render
        export default = __script
      `
    } else if (ctx.query.type === 'template') {
      const templateRender = compilerSFC.compileTemplate({
        source: descriptor.template.content
      })
      code = templateRender.code
    }
    ctx.type = 'application/javascript'
    ctx.body = stringToStream(code)
  }
  await next()
})
// 修改第三方资源路径
app.use(async (ctx, next) => {
  if (ctx.type === 'application/javascript') {
    const contents = await streamToString(ctx.body)
    // import vue from 'vue' -> import vue from '@modules/vue'
    ctx.body = contents
      .replace(/(from\s+['"])(?![\.\/])/g, '$1/@modules/')
      .replace(/process\.env\.NODE_ENV/g, '"development"')
  }
})
```
#### 单文件组件（.vue）
首先服务器会把 .vue 文件编译成一个对象返回，然后把这个单文件组件的 template 编译成 render 函数返回

### HMR
编译当前所修改的文件

而 webpack HMR 会以这个文件为入口重新 build 一次

### vite build
采用的是 Rollup


### 优点
* 快速冷启动
* 模块热更新
* 按需编译
* 开箱即用