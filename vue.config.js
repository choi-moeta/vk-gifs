const path = require('path')

module.exports =  {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/vk-gifs/'
  //   : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/vars.scss";',
      },
    },
  },
  lintOnSave: false,
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin(),
  //   ],
    resolve: {
      alias: {
        // vite uses /@/
        '/@': path.resolve(__dirname, './src'),
      },
      extensions: [ '.js', '.vue', '.json' ],
    },
  },
}
