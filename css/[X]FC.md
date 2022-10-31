## [X]FC
> 不要只知道KFC，你应该了解 BFC、IFC、GFC 和 FFC

### BFC
BFC 全称：Block Formatting Context, 名为 块级格式化上下文。

如何触发BFC？
* 根元素或其它包含它的元素
* 浮动 float: left/right/inherit
* 绝对定位元素 position: absolute/fixed
* 行内块 display: inline-block
* 表格单元格 display: table-cell
* 表格标题 display: table-caption
* 溢出元素 overflow: hidden/scroll/auto/inherit
* 弹性盒子 display: flex/inline-flex

布局规则
* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

应用场景
* 解决块级元素垂直方向margin重叠
* 解决高度塌陷问题
* 清除浮动

### IFC
IFC 全称：Inline Formatting Contexts, 名为 行内级格式化上下文

如何触发IFC
* 块级元素中仅包含内联级别元素

布局规则
* 在一个IFC内，子元素是水平方向横向排列的，并且垂直方向起点为元素顶部。
* 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。
* 在垂直方向上，子元素会以不同形式来对齐（vertical-align）能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
* IFC中的line box一般左右边贴紧其包含块，但float元素会优先排列。
* IFC中的line box高度由 CSS 行高计算规则来确定，同个IFC下的多个line box高度可能会不同。
* 当 inline boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定。
* 当一个inline box超过父元素的宽度时，它会被分割成多个boxes，这些boxes分布在多个line box中。如果子元素未设置强制换行的情况下，inline box将不可被分割，将会溢出父元素。

应用场景
* 元素水平居中 text-align: center
* 多行文本水平垂直居中

### GFC
GFC 全称：Grids Formatting Contexts, 名为 网格格式上下文

如何触发GFC
* 当为一个元素设置display值为grid或者inline-grid的时候，此元素将会获得一个独立的渲染区域

### FFC
FFC 全称：Flex Formatting Contexts, 名为 弹性格式上下文

如何触发FFC
* display 的值为 flex 或 inline-flex