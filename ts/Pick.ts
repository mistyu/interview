// 从 T 中挑选 K 中的属性
type Pick<T, K extends keyof T> = {
  [k in K]: T[k]
}
type A = 'a' | 'b'
type B = {
  a: string
  b: string
  c: number
}
type D = Pick<B, A>

export {}
