## hooks
1. `useState`
* 接收唯一的参数即状态初始值。
* 返回值为数组，数组中存储状态值和更改状态值的方法，方法名约定以 set 开头，后面加状态名称。
* 方法可以被调用多次，用以保存不同状态值。
* 参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况。
```jsx
const [name, setName] = useState('mistyu')
// 修改状态
setName('test')
```

2. `useEffect`
会在组件渲染到dom后执行

第二个参数时一个数组，当指定的依赖发生变化时才会重新更新

如果回调函数返回一个函数，则会在组件销毁的时候触发
```jsx
useEffect(() => () => {})
```

3. `useLayoutEffect`
会在组件渲染到dom前执行

为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？

在执行回调时 DOM渲染 已经被更新完，但浏览器渲染线程依旧处于被阻塞阶段，所以还没有发生回流、重绘过程。由于内存中的 DOM 已经被修改，通过 useLayoutEffect 可以拿到最新的 DOM 节点，并且在此时对 DOM 进行样式上的修改，假设修改了元素的 height，这些修改会在 DOM渲染 和 react 做出的更改一起被一次性渲染到屏幕上，依旧只有一次回流、重绘的代价。

如果放在 useEffect 里，useEffect 的函数会在组件渲染到屏幕之后执行，此时对 DOM 进行修改，会触发浏览器再次进行回流、重绘，增加了性能上的损耗

4. `useCallback`
类似 Vue 中的 watch， 只有第二个参数数组中第一的变量发生改变才会重新执行第一个参数 callback


5. `useMemo`
类似 Vue 中的计算属性，更适合经过函数计算得到一个确定的值，比如记忆组件


和 usecallback 的区别：useCallback 不会执行第一个参数cb，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回。
```js
useCallback(cb, [state])
// 等价于
useMemo(() => cb, [state])
```

6. `useRef`
类似 Vue 的 ref 用来获取组件或者 Dom 节点

组件重新渲染，保存的数组仍然存在，保存的数据被更改不会触发组件重新渲染
```jsx
cong myName = useRef('mistyu')
```

7. `useContext`
```jsx
import React, { createContext, useContext } from 'react'

const countContext = createContext()

function App () {
  return (
    // 提供者
    <countContext.Provider>
      <Foo />
    </countContext.Provider>
  )
}

function Foo () {
  const value = useContext(countContext) // 消费者
  return (
    <div>{ value }</div>
  )
}
```
8. `useReducer`
```jsx
import React, { useReducer } from 'react'

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

function App () {
  const [count, dispatch] = useReducer(reducer, 0)
  
  return (
    <div>  
      <span>{ count }</span>
      <button onClikc={() => dispatch({ type: 'increment' })}> + 1</button>
    </div>
  )
}

// 将 dispatch 传递给子组件就可以在子组件更改状态了
```

9. 自定义hooks
必须以 use 开头