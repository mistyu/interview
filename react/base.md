## react 的一些基础知识

### 受控与非受控组件
受控组件：没有自己的状态，由父组件控制状态

非受控组件：有自己的状态，由自己控制状态

### setState
1. 在同步代码中会进行状态合并，异步更新状态
2. 在异步代码中同步更新状态
3. setState第二个参数是一个回调函数，在状态更新，dom更新完成后调用

### [生命周期](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
只有类组件中才有
1. 挂载阶段
`contructor`,
`render`,
`getDerivedStateFromProps`（这是个静态方法,当我们 props 或者 state 发生变化时会触发，并且会把返回的对象属性更新到 state）,
`componentDidMount`

2. 更新阶段
`getDerivedStateFromProps`,
`shouldComponentUpdate`（返回 false，则不会更新组件，可用于优化）,
`render`,
`getSnapshotBeforeUpdate`（render 之后，componentDidUpdate 之前，必须和 componentDidUpdate 一起使用）,
`componentDidUpdate`

3. 卸载阶段
`componentWillUnmount`
