// 把 T 类型的参数全都变成可选的
type Partial<T> = {
  [k in keyof T]?: T[k]
}

export {}