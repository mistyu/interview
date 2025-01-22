
type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never