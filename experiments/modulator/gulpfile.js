/**
 * Created by yuriy.horobey on 2015-06-23.
 */
var gulp = require('gulp');
var path = require('path');
var modulator = require('modulator');

var buildPath = function (f) {
    var parts = path.parse(f.path);
    var dir = parts.dir.split(path.sep);
    var ret = 'build/' + dir[dir.length - 1] + '/' + parts.base;
    return ret;
};
var depConfigFile = './dependencies.js';
gulp.task('test', function (cb) {
    gulp.src('../../src/modulator/sample-src/**/*.js')
        .pipe(modulator(depConfigFile, './standard-module.js'))
        .pipe(gulp.dest(buildPath));
});

