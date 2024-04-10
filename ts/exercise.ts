// 1. Merge
// 合并两个已知类型，对于同名的key，向前进行覆盖，最后返回一个新类型
type Merge<T, U> = {
  [k in keyof (T & U)] :
    k extends keyof U ? U[k] :
    k extends keyof T ? T[k] :
    never
}

// 2. Diff
// 找出两个对象类型的差异，并将差异部分组成一个新的类型返回
type Diff<T extends object,U extends object> = {
  [K in keyof (T & U) as Exclude<K,keyof (T|U)>]:(T&U)[K]
}
