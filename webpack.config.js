var _ = require('lodash'),
	fs = require('fs'),
	sass = require('node-sass');

module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: 'public',
		filename: '[name].bundle.js',
		libraryTarget: 'this'
	},
	externals: {
		React: 'React'
	},
	resolveLoader: {
		root: __dirname + '/node_modules'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'jsx-loader?harmony'
			}
		]
	},
	plugins: [
		function bundleCss() {
			this.plugin('done', cssBundler);
		}
	],
	noInfo: true,
	colors: true
};

function cssBundler(stats) {
	var css = sass.renderSync({
		file: './src/styles/main.scss',
		includePaths: ['./src/styles'],
		outputStyle: 'nested'
	});
	fs.writeFileSync('./public/bundle.css', css.css);
	console.log('\nCSS file bundled to public/bundle.css');
	console.log('Stats: ', css.stats);
}