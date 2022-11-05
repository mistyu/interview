## CSS七层层叠顺序

![stacking order](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbc59ae1adb5454c8c7f60582df10ff9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

由上到下分别是：

（1）背景和边框：建立当前层叠上下文元素的背景和边框。

（2）负的z-index：当前层叠上下文中，z-index属性值为负的元素。

（3）块级盒：文档流内非行内级非定位后代元素。

（4）浮动盒：非定位浮动元素。

（5）行内盒：文档流内行内级非定位后代元素。

（6）z-index:0：层叠级数为0的定位元素。

（7）正z-index：z-index属性值为正的定位元素。
