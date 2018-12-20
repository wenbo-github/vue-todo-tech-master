const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//merge是用来合并base传递过来的config,如果新增就增加,如果重复就覆盖.
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
//判断是生产环境还是开发环境 详情可以看package.json里面
const isDev = process.env.NODE_ENV === 'development'


const defaultPluins=[
	new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin({
      template: path.join(__dirname,'template.html')
    })
]

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
     // 如果webpack.config.base.js里加上了publicPath 那么webpack.config.client.js中的historyApiFallback属性就要加上pubulic
    // 如
    // historyApiFallback:{  //在webpack.config.client.js中配置
    //   index: '/public/index.html'
    // },
    historyApiFallback:{
      index: '/index.html'
    },
    hot: true
}

let config;
//  vue-style-loader 本地更改css样式可以热更新，不刷新页面就更新
//  style-loader 没有热更新
if (isDev) {
  config=merge(baseConfig,{
  	devtool:'#cheap-module-eval-source-map',
  	module:{
  		rules:[
  			{
  				test: /\.styl/,
			    use: [
			      'vue-style-loader',
			      'css-loader',
			      {
			        loader: 'postcss-loader',
			        options: {
			          sourceMap: true,
			        }
			      },
			      'stylus-loader'
			    ]
  			}
  		]
  	},
  	devServer,
  	plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })

} else {
  config=merge(baseConfig,{
  	entry:{
  		app: path.join(__dirname, '../client/index.js'),
    	vendor: ['vue']
  	},
  	output:{
  		filename:'[name].[chunkhash:8].js'
  	},
  	module:{
  		rules:[{
  			test: /\.styl/,
		    use: ExtractPlugin.extract({
		        fallback: 'vue-style-loader',
		        use: [
		          'css-loader',
		          {
		            loader: 'postcss-loader',
		            options: {
		              sourceMap: true,
		            }
		          },
		          'stylus-loader'
		        ]
		    })
  		}]
    },
    // optimization:{
    //   splitChunks:{
    //     chunks:'all'
    //   },
    //   runtimeChunk:true
    // },
  	plugins:defaultPluins.concat([
	  		new ExtractPlugin('styles.[contentHash:8].css'),
		    new webpack.optimize.CommonsChunkPlugin({
		      name: 'vendor'
		    }),
		    new webpack.optimize.CommonsChunkPlugin({
		      name: 'runtime'
		    })
  	])
  })
}

module.exports = config
