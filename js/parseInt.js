// 执行以下代码，会输出什么内容
['0', '1', '2'].map(parseInt)

// parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数
// 如果 radix 是 undefined、0 或未指定的 一般为 10（chrome）

// 等价于
['0', '1', '2'].map((num, index) => parseInt(num, index)) // => [0, NaN, NaN]