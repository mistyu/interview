// 提取Type中所有能够赋值给Union的属性，将这些属性构成一个新的类型
type Extract<T, U> = T extends U ? T : never

export {}

// 接收两个联合类型 T, U，将 T 中 U 的属性取出
