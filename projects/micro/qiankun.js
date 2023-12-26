// 1. 基于 single-spa
// 2. 基于路由匹配来加载注册的子应用 HTML
// 3. 基于 import-html-entry 库来加载注册的子应用 HTML
// 4. 解析 HTML 的 script 以及 css
// 5. 对 script 和 css 做沙箱隔离
// 6. script 就是做 window 快照或者 proxy 代理
// 7. css 就是给每个 css 加个属性前缀（像 Vue scoped 一样）或者 shadow dom 做隔离


// 兼容 vite
// dev 环境 css 隔离不生效，因为开发环境是用 esmodule 对方式 import 的，qiankun 不会对 css 隔离，生成环境是用的 System.import 引入会被 qiankun 处理