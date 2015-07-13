/**
 * Created by yuriy.horobey on 2015-06-23.
 */
var gulp = require('gulp');
var modulator = require('modulator');
var concat = require('gulp-concat');

var buildPath = function (f) {
    var filePath = f.base.substring(f.cwd.length);
    var path = 'build' + filePath;
    return path;
};
var depConfigFile = './src/dependencies.js';
gulp.task('build', ['build-service-locator', 'build-all']);
gulp.task('build-all', function (cb) {
    return gulp
        .src([
            './src/**/*.js',
            //excludes
            '!./src/service-locator/**',
            '!./src/**/*.spec.js',
            '!./src/**/node_modules/**/*.*',
            '!./src/**/experiments/**/*.*',
            '!./src/**/~deprecated*/**/*.*',
            '!./**/scaffolding/**/*.*',
            '!./src/**/~*.*',
            '!./src/**/sample*/**/*.*',
            '!./src/**/sample*.*',
            '!./src/**/dependencies.*',
            '!./src/**/gulpfile.js',
            '!./src/modulator/**/*.*'

        ])
        .pipe(modulator(depConfigFile, './src/scaffolding/modulator/templates/standard-module.js'))
        .pipe(concat('components.js'))

        .pipe(gulp.dest(buildPath));
});

gulp.task('build-service-locator', function () {
    return gulp
        .src('./src/service-locator/service-locator.js')
        .pipe(modulator(depConfigFile, './src/scaffolding/modulator/templates/service-locator.js'))
        .pipe(gulp.dest(buildPath));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['build']);
    /*
     watcher.on('change', function (event) {
     console.log('File ' + event.path + ' was ' + event.type);
     });
     */
})

gulp.task('default', ['build', 'watch'])


