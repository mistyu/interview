// 把 T, U 中共有的属性去掉
type Exclude<T, U> = T extends U ? never : T

type A = 'a' | 'b' | 'c'
type B = 'c' | 'd'

type C = Exclude<A, B>

export {}
