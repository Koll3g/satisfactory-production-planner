module.exports = {
  publicPath: '/satisfactory-production-planner/',
  chainWebpack: config => config.optimization.minimize(false)
}