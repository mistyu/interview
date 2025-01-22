import { Pick } from './Pick'
// 从 T 去去掉 K 中的属性
type Omit<T, U extends keyof any> = Pick<T, Exclude<keyof T, U>>

export {}
// 接收一个对象类型和联合类型 T U，从 T 中去掉 U 中的属性
