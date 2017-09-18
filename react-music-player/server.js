/*
 * @Author: chenzhizhuo
 * @Date:   2017-08-16 22:39:02
 * @Last Modified by:   chenzhizhuo
 * @Last Modified time: 2017-08-16 23:31:56
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config')

//实例换一个 WebpackDevServer 拿到webpack 的配置文件，并加载自己的配置文件
new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	quiet: false,
	noInfo: false,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false
	}
}).listen(3000, 'localhost', function(err) {
	if (err) {
		console.log(err);
	}
	console.log("listening at localhost:3000");
});