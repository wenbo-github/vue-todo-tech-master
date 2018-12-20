const docsLoader = require.resolve('./doc-loader')
module.exports = (isDev) =>{
	return {
//		preserveWhitepace它的作用是允许元素间生成空白内容

		preserveWhitepace:true,
		
//		如果希望把vue文件里面的css文件打包,把所有应用的css打包到一个文件里面extractCSS:true
//      如下是判断是不是正式打包 如果是正式就打包到一起，如果是开发环境就不打包到一起

		extractCSS:!isDev,
		
		cssModules:{
			//在当前vue文件中写的样式会生成独一无二的名字，在其他vue文件中是无法调用的
			//判断一下是不是正式环境，如果是正式环境直接用hash就可以了。
			localIdentName:isDev ? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
			//把css类名为‘-’连接的，转化为驼峰的
			//详情见header.vue  如果要vue中css样式用camelCase方法需要在style标签中配置module
			camelCase:true
		},
/*		热重载 
 * 		hotReload:false对于组件的热重载功能关闭
 * 		但是不影响css热重载，因为css热重载是依靠vue-style-loader
 *
 *		//hotReload:isDev
 *		
 *	     可以自定义loader
 *     详情可见header 和 app.vue中
 *
 *		loaders:{
 *			'docs':docsLoader,
 *		        不只是可以自定义loader,也可以给默认的文件指定loader
*		 例如 js:'coffe-loader',
*			html
*
*		},
*     在指定loader解析代码之前 用preLoader解析在用指定loader解析
*      例如 js用babel-loader
* 	   preLoader:{
* 			js:
* 		}
* 	  在指定loader解析代码之后在 用postLoader解析
* 	例如  postLoader:{
* 			js:
* 	}
*/
		
	}
}
