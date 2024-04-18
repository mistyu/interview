// 不要使用内置的Readonly<T>，自己实现一个。
// 泛型 Readonly<T> 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。
// 也就是不可以再对该对象的属性赋值。
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
