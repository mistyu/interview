## 如何捕获 JS 中的错误
> 前端异常捕获原理

### Error Type
* SyntaxError: 语法异常
在引擎执行代码之前，编译器需要对 js 进行编译，编辑阶段包括：词法分析，语法分析

编译阶段发生的异常都是 SyntaxError，但 SyntaxError 不完全都发生于编译阶段
```js
const a = '3;
```
比如这行代码，缺少一个引号，就会发生: SyntaxError: Invalid or unexpected token.

其他常见的 SyntaxError：
  + SyntaxError:Unexpected token u in JSON at position 0
  + SyntaxError:Unexpected token '<'
  + SyntaxError:Unexpected identifier

* ReferenceError: 引用异常
引用异常，比较常见，类似于 Java 语言中最著名的空指针异常 (Null Pointer Exception，NPE)

* RangeError: 异常范围
范围错误(超出边界)
  + new Array(-20) 会导致 RangeError: Invalid array length
  + 递归等消耗内存的程序会导致 RangeError: Maximum call stack size exceeded



* Error: 异常基类
Error 是所有错误的基类，其他错误类型继承该类型。所有错误类型都共享相同的属性
  + Error.prototype.message 错误消息。对于用户创建的 Error 对象，这是构造函数的第一个参数提供的字符串。
  + Error.prototype.name 错误名称。这是由构造函数决定的。
  + Error.prototype.stack 错误堆栈
```js
// 自定义一个错误类
class MyError extends Error {
  constructor(message) {
    super()
    this.name = 'MyError'
    this.message = message
  }
}
```
由于浏览器基于安全考虑效避免敏感信息无意中被第三方 (不受控制的) 脚本捕获到，浏览器只允许同域下的脚本捕获具体的错误信息


* InternalError: 内部异常
这种异常极为少见，在 JS 引擎内部发生，示例场景通常为某些成分过大，例如：
  + “too many switch cases”（过多 case 子句）；
  + “too many parentheses in regular expression”（正则表达式中括号过多）；
  + “array initializer too large”（数组初始化器过大）；


* TypeError: 类型异常
在对值进行不合理操作时会发生，比如试图对一个非函数类型的值进行函数调用，或者引用 null 或 undefined 类型的值中的属性，那么引擎会抛出这种类型的异常

* EvalError: Eval 方法异常
在 eval() 方法执行过程中抛出 EvalError 异常

* URIError: URI 相关方法产生的异常
用来表示以一种错误的方式使用全局 URI 处理函数而产生的错误.

decodeURI, decodeURIComponent, encodeURI, encodeURIComponent 这四个方法会产生这种异常


### 异常处理
* window.onerror 捕获语法异常
* 可以重写 setTimeout、setInterval 等异步方法，用同步的写法包裹 try 来捕获异步函数中发生的错误
* window.addEventListener (‘unhandledrejection’,・・・); 捕获未处理的异步 reject
window.addEventListener (‘error’, …) 捕获资源异常
* 重写 fetch, XMLHttpRequest 来捕获接口状态
