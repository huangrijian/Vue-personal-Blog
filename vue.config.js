const isProduction = process.env.NODE_ENV === 'production'
// 分析引入依赖包的大小
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

//正式环境不打包公共js
let externals = {}
//储存cdn的文件
let cdn = {
  css: [
    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.6/theme-chalk/index.min.css' // element-ui css 样式表
  ],
  js: []
}
//正式环境才需要
if (isProduction) {
  externals = { //排除打包的js
    vue: 'Vue',
    'element-ui': 'ELEMENT'
  }
  cdn.js = [
    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js', // vuejs
    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.6/index.min.js', // element-ui js
    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.6/locale/zh-CN.min.js',
  ]
}

module.exports = {
  publicPath: './',
  productionSourceMap: !isProduction, //关闭生产环境下的SourceMap映射文件
  css: {
    sourceMap: !isProduction // css sourceMap 配置  
  },
  configureWebpack: {
    // plugins: [
    //   new BundleAnalyzerPlugin() // 分析打包大小使用默认配置         
    // ],
    //常用的公共js 排除掉，不打包 而是在index添加cdn，
    externals,
    //...其它配置
  },
  chainWebpack: config => {
    // 注入cdn变量 (打包时会执行)
    config.plugin('html').tap(args => {
      args[0].cdn = cdn // 配置cdn给插件
      return args
    })

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
      // .rule('images')
      // .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      // .use('image-webpack-loader')
      // .loader('image-webpack-loader')
      // .options({
      //   bypassOnDebug: true
      // })
      // .end()
      // vue-cli 4.x版本需要进行以下配置
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
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