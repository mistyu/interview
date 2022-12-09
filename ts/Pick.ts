// 从 T 中挑选 K 中的属性
export type Pick<T, U extends keyof T> = {
  [k in U]: T[k]
}
type A = 'a' | 'b'
type B = {
  a: string
  b: string
  c: number
}
type D = Pick<B, A>

export {}
// 接收一个对象类型和一个联合类型 T U，从 T 中挑选 U 中的属性

