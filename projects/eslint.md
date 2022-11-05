## eslint 订制团队的校验风格

### plugins 和 extends 区别

plugin插件主要是为eslint新增一些检查规则

extends可以看做是去集成一个个配置方案的最佳实践

自己的理解：plugins 可以看作试扩展 eslint 检测规则，自己定制；extends 可以看作是直接用别人配置好的规则配置

### 如何使用内部定制的风格
* 封装一个 eslint 配置 npm 包
这里使用 vue 推荐的规则配置

// "@mistyu/eslint-config-vproject"
```js
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      }
    }
  ]
}
```
tip: 相关依赖记得在 package.json 中 npm i xxx, 确保在项目中使用时不会因为没有下载依赖不起作用

* 在项目中引用
.eslintrc.js
```js
module.exports = {
  root: true,
  extends: ["@mistyu/eslint-config-vproject"],
};
```
