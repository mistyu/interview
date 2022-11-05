## @import 和 link 区别

### link
* link 是 HTML 提供的标签，不仅可以加载 CSS，还可以定义 rel 等属性
* ink在页面加载时 CSS 同时被加载(不阻塞)
* link 是 HTML 提供的语法，不存在兼容性问题
* 可以通过 js 插入 link 标签来改变样式

### @import
* @import 是 CSS 提供的语法，只有导入样式表的作用
* 引入的 CSS 要等页面加载完毕后再加载
* @import 是 css2.1 提供的语法，ie5以上才兼容
* 不能通过js @import 引入
