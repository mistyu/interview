## Webpack

### loader
> 一个导出的 JS 模块，它接受一个 loader 产生的结果或者资源文件作为入参，返回处理后的结构

loader 的使用类型： post、inline、normal、pre

babel-loader
```js
const babel = require('@babel/core')
const path = require('path')

function loader (source) {
  // 获取 loader 传入的预设
  let options = this.getOptions // 在 loader 中，this 是 loaderContext 的对象，webpack 提供的
  const callback = this.async()
  babel.transformAsync(source, options).then(({ code }) => {
    // 在 loader 执行完成后才能调用 callback，已经完成，才能继续下一个 loader
    callback(null, code)
  })
}

module.exports = loader
```


### plugin
> 插件向开发者提供了 webpack 引擎中完整的能力，在使用阶段式的构建回调，开发者可以引入他们自己的行为到 webpack 构建流程中

1. 插件是一个类
2. 类上有一个 apply 的实例方法，安装插件的时候，会被 webpack compiler 调用一次
3. apply 的参数是 compiler

在插件开发中最重要的两个资源就是 compiler 和 comilation 对象
* comolier:
  代表了整个 webpack 环境配置
* compliation:
  代表了一次资源版本构建
```js
class AutoInsertExternalsCDNToHtml {
  apply(compiler) {
    // 在打包结束后写入 dist 前会调用
    compiler.hooks.emit.tap('AutoInsertExternalsCDNToHtml', compilation => {
      const htmlContent = compilation.assets['index.html'].source()
      const newHtmlContent = htmlContent.replace('</title>', '</title><link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" preload><script src="https://unpkg.com/vue@2.6.10/dist/vue.runtime.min.js" preload></script><script src="https://unpkg.com/element-ui@2.15.2/lib/index.js" preload></script><script src="https://unpkg.com/vue-router@3.5.1/dist/vue-router.min.js" preload></script> <script src="https://unpkg.com/vuex@3.6.2/dist/vuex.min.js" preload></script>')
      compilation.assets['index.html'] = {
        source: () => newHtmlContent,
        size: () => newHtmlContent.length
      }
    })
  }
}

module.exports = AutoInsertExternalsCDNToHtml
```

