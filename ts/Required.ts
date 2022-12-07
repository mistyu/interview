// 将可选项变成必选项
type Required<T> = {
  [key in keyof T]-?: T[key]
}

export {}