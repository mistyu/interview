// 1. Merge
// 合并两个已知类型，对于同名的key，向前进行覆盖，最后返回一个新类型
type Merge<T, U> = {
  [k in keyof T | keyof U] :
    k extends keyof U ? U[k] :
    k extends keyof T ? T[k] :
    never
}
