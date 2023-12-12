// 该工具类型会构造一个类型，这个类型的键的类型是Keys，值的类型是 T
// T 为联合类型
type Record<T extends keyof any, K> = {
  [key in T]: K
}

export {}