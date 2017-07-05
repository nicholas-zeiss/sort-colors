module.exports = {
	entry: './app/client/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/app/dist'
	},
	module: {
		loaders: [{
	      test: /\.js$/,
	      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
	      include: __dirname + '/app/client'
	  }]
	}
};