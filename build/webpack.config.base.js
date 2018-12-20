const path = require('path')
const createvueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    // 如果这里加上了publicPath 那么webpack.config.client.js中的historyApiFallback属性就要加上pubulic
    // 如
    // historyApiFallback:{  //在webpack.config.client.js中配置
    //   index: '/public/index.html'
    // },
    // publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test:/\.(vue|js|jsx)$/,
        loader:'eslint-loader',
        exclude:/node_modeles/,
        //enforce是预处理  pre是之前 post是之后
        //在使用以下真正的loader之前调用，如果不通过直接报错不走下面真正的loader
        enforce:'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options:createvueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
//      exclude不包含的意思
        exclude:/node_modules/

      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}



module.exports = config
