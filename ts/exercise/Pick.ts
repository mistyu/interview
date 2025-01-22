// 不使用 Pick<T, K> ，实现 TS 内置的 Pick<T, K> 的功能。
// 从类型 T 中选出符合 K 的属性，构造一个新的类型。
type MyPick<T, U extends keyof T> = {
  [k in U]: T[k] // 这部分表示一个迭代器，它遍历类型 U 中的每一个键。k 是当前迭代的键。
}

interface C {
  a: number;
  b: string;
}

interface D {
  c: number;
  d: string;
}


type B = Omit<C, 'b' | 'd'>


type A = Record<'a' &'b', number>