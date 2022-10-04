module.exports = {
  publicPath: '/satisfactory-production-planner/',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        return args
      })
  }
}