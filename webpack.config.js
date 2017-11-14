

const webpack = require('webpack');

module.exports = {
	entry: './app/client/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/app/dist'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') }
		})
	]
};