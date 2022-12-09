type Readonly<T> = {
  readonly [k in keyof T]: T[k]
}

export {}
