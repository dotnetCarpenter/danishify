// Karma configuration
// Generated on Tue Mar 08 2016 16:45:49 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'js/danishify.js',
			'test/danishify.spec.js'
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'js/danishify.js': ['babel'],
			'test/danishify.spec.js': ['babel']
		},
		'babelPreprocessor': {
			options: {
				presets: ['es2015'],
				plugins: ['transform-es2015-modules-umd'],
				sourceMap: 'inline'
			},
			filename: function (file) {
				return file.originalPath.replace(/\.js$/, '.es5.js');
			},
			sourceFileName: function (file) {
				return file.originalPath;
			}
		},
		
		// plugins - needed to get es2015 modules to work
		/*plugins: [
			'babel-plugin-transform-es2015-modules-umd',
			'karma-babel-preprocessor',
			'karma-jasmine',
			'karma-phantomjs-launcher',
		],*/


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
}
