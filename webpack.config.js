
module.exports = {
	entry: './app/client/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/app/dist'
	},
	module: {
		loaders: [{
	      test: /\.js$/,
	      loader: ['babel-loader'],
	      include: __dirname + '/app/client'
	  }]
	}
};