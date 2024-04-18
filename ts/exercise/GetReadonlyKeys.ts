// 实现泛型GetReadonlyKeys<T>，GetReadonlyKeys<T>返回由对象 T 所有只读属性的键组成的联合类型。
type GetReadonlyKeys<T> = keyof {
  [P in keyof T as Equal<{ [K in P]: T[K] }, Readonly<{ [K in P]: T[K] }>> extends false ? never: P]: T[P]
}
