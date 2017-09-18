/*
 * @Author: chenzhizhuo
 * @Date:   2017-08-13 22:12:55
 * @Last Modified by:   chenzhizhuo
 * @Last Modified time: 2017-08-19 19:01:22
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//打包命令：　定位到根目录下： 运行->  webpack
module.exports = {
	//__dirname 环境自带变量，获取当前路径
	entry: [ //入口文件
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		//'react-hot-loader/patch',
		path.join(__dirname + '/app/index.js')
	], // __dirname + '/app/index.js', 
	output: {
		path: path.join(__dirname + '/dist'), //输出路径
		filename: '[name].js', //输出文件名
		publicPath: '/'
	},
	plugins: [
		//这里使用了html 自动打包生成插件，
		//所有编写的内容会自动打包到指定模板的指定位置中（这里是：inject），
		//并生成index.html文件
		new HtmlWebpackPlugin({
			template: './index.tpl.html',
			inject: 'body',
			filename: './index.html'
		}),
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.less/,
			loader: 'style-loader!css-loader!less-loader'
		}]
	}
}