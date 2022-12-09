// 把 T, U 中共有的属性去掉
export type Exclude<T, U> = T extends U ? never : T

type A = 'a' | 'b' | 'c'
type B = 'c' | 'd'

type C = Exclude<A, B>

export {}
// 接收两个联合类型 T U 将 T 中 U 的属性去掉
