module.exports = {
  publicPath: '/satisfactory-production-planner/',
  configureWebpack: config => {
    config.optimization.minimizer = [new UglifyJsPlugin({ 
     })]
  }
}