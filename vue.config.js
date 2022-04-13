const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  productionSourceMap: !isProduction, //关闭生产环境下的SourceMap映射文件
  css: {
    sourceMap: !isProduction // css sourceMap 配置  
  },
  chainWebpack: config => {

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('js')
        .use(require.resolve('terser-webpack-plugin'), [{
          terserOptions: {
            // 打包删掉正文
            comments: true,
            compress: {
              drop_console: true,//去除console语句
              drop_debugger: true//去除debugger语句
              // pure_funcs: ["console.log"]
            }
          }
        }])
    } else {
      // disable optimization during tests to speed things up
      config.optimization.minimize(false)
    }
    // 压缩图片
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: 4096,
        fallback: {
          loader: require.resolve('file-loader'),
          options: {
            name: `static/img[name].[hash:8].[ext]`
          }
        }
      })
  }
}