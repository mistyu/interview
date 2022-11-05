## webpack

### 常用的loader
#### css-loader
Webpack 中操作 CSS 需要使用的两个关键的 loader：css-loader 和 style-loader
* css-loader：导入 CSS 模块，对 CSS 代码进行编译处理
* style-loader：创建 style 标签，把 CSS 内容写入标签
在实际使用中，css-loader 的执行顺序一定要安排在 style-loader 的前面。因为只有完成了编译过程，才可以对 css 代码进行插入；若提前插入了未编译的代码，那么 webpack 是无法理解未编译的代码的，它会无情报错。