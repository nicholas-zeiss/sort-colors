var path = require('path');

module.exports = {
	entry: './app/client/App.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'app/dist')
	},
	module: {
		loaders: [{
	      test: /\.js$/,
	      loaders: ['babel?presets[]=es2015&presets[]=react'],
	      include: path.join(__dirname, 'app/client')
	  }]
	}
};