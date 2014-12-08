// Karma configuration
// Generated on Thu Jan 09 2014 11:56:29 GMT+0200 (FLE Standard Time)

module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath : '',

		// frameworks to use
		frameworks : [ 'jasmine' ],

		// list of files / patterns to load in the browser
		files : [
		// sources
		'../src/**/*.js',
		// specs
		'./specs/**/*.spec.js',
		// fixtures
		{
			pattern : './specs/**/*.html',
			watched : true,
			served : true,
			included : false
		},
		// 3r parties
		{
			pattern : '../vendor/jquery-1.11.1.js',
			watched : false,
			served : true,
			included : true
		}, {
			pattern : '../vendor/jasmine-jquery.js',
			watched : false,
			served : true,
			included : true
		}

		],

		// list of files to exclude
		exclude : [

		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters : [   ],

		coverageReporter : {
			reporters : [ {
				type : 'html',
				dir : 'coverage/'
			}

			],
		},

		preprocessors : {
			'../src/**/*.js' : [ 'coverage' ]
		},

		// web server port
		port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR ||
		// config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file
		// changes
		autoWatch : true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install
		// karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install
		// karma-ie-launcher`)
		browsers : [ 'Chrome' ],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout : 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		//singleRun : false,
		singleRun : false,

		junitReporter : {
			// will be resolved to basePath (in the same way as files/exclude
			// patterns)
			outputFile : 'test-results.xml'
		}
	});
};
