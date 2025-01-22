# Flutter 架构概览
> 一款多端构建的 UI 框架，目前主要用于移动端（Android, iOS）

他是基于图像渲染引擎去直接绘制UI

## [Flutter 架构](https://flutter.cn/docs/resources/architectural-overview)
![Flutter](https://flutter.cn/docs/assets/images/docs/arch-overview/archdiagram.png)

从结构上看，Flutter 主要分为三个层次：

* Dart 框架层（Framework）
上层框架，主要包括 dart 侧 Widget 管理、绘制、动画、手势等接口

* C++ 引擎层（Engine）
虚拟机、线程模型、与平台的通信、绘制流程、系统事件、文字布局、帧渲染管线等

* 平台相关的嵌入层（Embeder）
渲染图层、平台线程和事件循环管理，Native Plugin 等

## Flutter 引擎
Flutter 引擎是 Flutter 的核心，主要使用 C++ 编写，并提供了 Flutter 应用所需的原语。当需要绘制新一帧的内容时，引擎将负责对需要合成的场景进行栅格化。它提供了 Flutter 核心 API 的底层实现，包括图形（在 iOS 和 Android 上通过 Impeller ，在其他平台上通过 Skia ）、文本布局、文件及网络 IO、辅助功能支持、插件架构和 Dart 运行环境及编译环境的工具链。

## Flutter 的渲染模型
Flutter 通过绕过系统 UI 组件库，使用自己的 widget 内容集，削减了抽象层的开销。用于绘制 Flutter 图像内容的 Dart 代码被编译为机器码，并使用 Skia 进行渲染。 Flutter 同时也嵌入了自己的 Skia 副本（未来会迁移到 Impeller），让开发者能在设备未更新到最新的系统时，也能跟进升级自己的应用，保证稳定性并提升性能

引擎将底层 C++ 代码包装成 Dart 代码，通过 dart:ui 暴露给 Flutter 框架层1。该库暴露了最底层的原语，包括用于驱动输入、图形、和文本渲染的子系统的类。

## Widget
在 Flutter 中，Widget 是描述界面元素的基本单元，可以包含视觉和交互元素。Widget 可以嵌套、组合和扩展，从而构建出复杂的 UI 界面。你可以把它看作是前端中的“控件”或“组件”。 Widget 是控件实现的基本逻辑单位，里面存储的是有关视图渲染的配置信息，包括布局、渲染属性、事件响应信息等。

在 Flutter 中，Widget 可以分为两种类型：StatelessWidget 和 StatefulWidget。StatelessWidget 是不可变的，这意味着它们的配置信息在生命周期内不能改变。每当你改变配置，Flutter 框架就会创建一个新的 StatelessWidget 实例。而 StatefulWidget 在生命周期内可以改变状态。换句话说，StatefulWidget 可以在生命周期内进行多次构建，因为它可以持有状态。

总的来说，Flutter 的核心思想是用 widget 来构建你的 UI 界面。 Widget 描述了在当前的配置和状态下视图所应该呈现的样子。当 widget 的状态改变时，它会重新构建其描述（展示的 UI），框架则会对比前后变化的不同，以确定底层渲染树从一个状态转换到下一个状态所需的最小更改。

## 如何理解 Flutter 中的 Widget Element RenderObject
在Flutter中，"Widget", "Element", 和 "RenderObject" 是构成应用界面的三个核心概念，它们共同工作以创建和管理UI。

### Widget
* 定义：Widget是Flutter应用的基本构建块，它是一个不可变的描述界面部分的配置数据。Widget可以被认为是UI的蓝图。
* 特性：Widget本身是无状态的，它们是被用来描述应用应该看起来像什么的配置。它们可能包含数据和回调函数，这些都是传给构造函数的参数。
* 种类：Widget有许多种类，包括用于布局（如Row、Column）、用于交互（如Button）、用于展示（如Text、Image）等。

### Element
* 定义：Element是Widget的实例化。当一个Widget被放置到UI树中时，框架会为其创建一个对应的Element对象。Element对象是具有生命周期的，它负责维护与Widget的关系以及Widget在树中的位置。
* 角色：Element是Widgets和RenderObjects之间的桥梁。每个Element对象都知道如何创建和更新与其对应的RenderObject。
* 特性：Element对象通常存在于整个Widget生命周期中，并负责管理子Element的创建和重新组合。

### RenderObject
* 定义：RenderObject是一个用于UI渲染的对象。它负责具体的布局、绘制和事件处理。
* 特性：RenderObject关心的是具体的渲染细节。例如，对于一个按钮，RenderObject会处理它的实际大小、它在屏幕上的位置、当用户触摸时如何表现等。
* 布局和绘制：RenderObject在布局过程中确定自身以及子对象的大小和位置，在绘制过程中处理实际的像素渲染。

### 总结
Widget -> Element -> RenderObject：Widget定义了UI的配置，Element将Widget连接到UI树中并管理其生命周期，RenderObject负责实际的布局和绘制。
在Flutter中，我们通常只与Widget打交道，定义应用的界面和逻辑。框架在背后处理Element和RenderObject，以确保UI正确渲染。