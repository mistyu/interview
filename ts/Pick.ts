// 从 T 中挑选 K 中的属性
export type Pick<T, U extends keyof T> = {
  [k in U]: T[k]
}
type A = 'a' | 'b'
type B = {
  a: string
  b: number
  c: number
}
type CC = {
  a: string
  b: number
}

type C = 'a'

type DD = 'a' | 'b' | 'c'

type E = Partial<A>
type D = Pick<B, A>
type F = Record<DD, B>
type G = Extract<C, DD>
type H = Readonly<DD>
let h: DD = 'a'
h = 'd'
let bb: CC = {
  a: 'a',
  b: 1,
}

let a: CC = {
  a: 'a',
  b: 1,
}

a = {
  a: 'a',
  b: 1,
}

type MyUnion = { a: number,  c: boolean } | { b: string, d: string };
type AllProperties<T> = {
  [P in keyof T]: T[P];
};

type AllPropsOfMyUnion = AllProperties<MyUnion>;
let all1: MyUnion = {
  b: '1',
  a: 1,
  d: '1'
}
let all: AllPropsOfMyUnion = {
  b: '1',
}

export {}
// 接收一个对象类型和一个联合类型 T U，从 T 中挑选 U 中的属性

