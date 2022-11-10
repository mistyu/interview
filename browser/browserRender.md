## 浏览器相关

### 浏览器渲染
#### [css/js 阻塞 dom解析 吗](https://juejin.cn/post/6844903497599549453)

* CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。
* JS 阻塞 DOM 解析，但浏览器会"偷看" DOM，预先下载相关资源。
* 浏览器遇到 `<script>` 且没有 defer 或 async 属性的 标签时，会触发页面渲染，因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

### preload/prefetch
* `preload`
`<link>`元素的 rel 属性的属性值 preload 能够让你在你的HTML页面中`<head>`元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。

preload 提供了一种声明式的命令，让浏览器提前加载指定资源(加载后并不执行)，需要执行时再执行

1. 使用 preload 后，不管资源是否使用都将提前加载。若不确定资源是必定会加载的，则不要错误使用 preload，以免出现性能问题。
2. preload 有 as 属性，浏览器可以设置正确的资源加载优先级，这种方式可以确保资源根据其重要性依次加载， 所以，preload 既不会影响重要资源的加载，又不会让次要资源影响自身的加载；浏览器能根据 as 的值发送适当的 Accept 头部信息；浏览器通过 as 值能得知资源类型，因此当获取的资源相同时，浏览器能够判断前面获取的资源是否能重用。
3. 如果忽略 as 属性，或者错误的 as 属性会使 preload 等同于 XHR 请求，浏览器不知道加载的是什么，因此会赋予此类资源非常低的加载优先级。
4. 如果对所 preload 的资源不使用明确的 as 属性，将会导致二次获取。
5. preload 加载 font 字体资源不带 crossorigin 也会二次获取。

特殊用法
```html
preload 可以定义资源加载完毕后的回调函数，如下：
<link rel="preload" href="https://xxx.cn/js/test.js" as="javascript" onload="preloadHandle()">

可以使用preload的样式表立即生效。
<link rel="preload" href="demo.css" onload="this.rel=stylesheet">

对于加载跨域的资源，必须加上 crossorigin 属性。
<link rel="preload" as="style" crossorigin href="https://test.com/css/test.css">

link标签还可以接收一个media属性，进行简单的媒体查询。
<link rel="preload" href="https://xxx.cn/img/bg.png" as="image" media="(max-width: 640px)">
```

* `prefetch`
`<link>`元素的 rel 属性的属性值prefetch能够让你在你的HTML页面中`<head>`元素内部书写一些声明式的资源获取请求，告诉浏览器加载下一页面可能会用到的资源，注意是下一页面，而不是当前页面。因此该方法的加载优先级非常低，也就是说该方式的作用是加速下一个页面的加载速度。
```html
<link rel="prefetch" href="./js/01.js">
<link rel="prefetch" href="./js/02.js">
```

* `preload` 和 `prefetch` 的区别
1. preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源。
2. prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。
3. 在VUE SSR生成的页面中，首页的资源均使用preload，而路由对应的资源，则使用prefetch。
4. 对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。
5. 使用 preload 和 prefetch 的逻辑可能不是写到一起，但一旦发生对用一资源 preload 或 prefetch 的话，会带来双倍的网络请求。
```html
<link rel="preload"   href="https://xxx.cn/js/test.js" as="javascript">
<link rel="prefetch"  href="https://xxx.cn/js/test.js" as="javascript">
```
