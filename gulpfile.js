var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('cleanBuild', function (cb) {
  var rimraf = require('rimraf');
  rimraf('./www/js/', cb);
});

gulp.task('build', ['cleanBuild'], function (cb) {
  return gulp.src('')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
  gulp.watch('./source/jsx/**/*.jsx', ['build']);
});

gulp.task('default', ['watch']);