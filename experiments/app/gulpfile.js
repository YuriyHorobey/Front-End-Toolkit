/**
 * Created by yuriy.horobey on 2015-04-22.
 */
var gulp = require('gulp');
var path = require('path');
var through = require('through2');

var PATH_FET = '../../src/';
var PROJECT_FILES = [
	PATH_FET + 'ServiceLocator.js',
	PATH_FET + 'JSONAccess.js'
];


gulp.task('copy', function () {
	return gulp.src(PROJECT_FILES).pipe(gulp.dest('./lib/fet/'));
});

gulp.task('transform', function () {
	return gulp.src(PROJECT_FILES)
		.pipe(through({objectMode: true, decodeStrings: false},
			function (chunk, encoding, callback) {
				console.log('a', arguments[0])
				console.log('chunk', chunk.File);
				console.log('chunk.B', chunk.Buffer);

				for (var i = 0; i < chunk._contents.length; i++) {
					if (chunk._contents[i] == 97) {
						chunk._contents[i] = 122 // swap 'a' for 'z'
					}
				}
				this.push(chunk)
				callback();
			}
		)
	)
		.pipe(gulp.dest('./lib/fet-transformed/'));
});

gulp.task('watch', function () {
	return gulp.watch(PROJECT_FILES, ['transform']);
});


gulp.task('default',
	['transform', 'watch']
);
