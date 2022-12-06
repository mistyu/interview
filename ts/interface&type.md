## interface & type 的区别

### interface
* 可以重复定义，最终和合并
* 可以 extend
* interface 定义的类型，可以通过 declear module 扩展
```js
import { AxiosRequestConfig } from 'axios'
declear module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
  }
}
```
### type
* 可以声明类型计算后的结果
* 同 & 来达到继承的效果