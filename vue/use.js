// Vue.use
// 接收一个 plugin 必须是一个函数或者对象(有 install 方法)
Vue.use = function (plugin) {
  // 记录已安装的插件
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }
  // 把第个参数 plugin 去掉
  const args = toArray(arguments, 1)
  // 把 this 插入第一个参数
  args.unshift(this)

  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  installedPlugins.push(plugin)

  return this
}