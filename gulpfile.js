var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");

gulp.task('cleanBuild', function (cb) {
  var rimraf = require('rimraf');
  rimraf('./www/js/', cb);
});

gulp.task('build', ['cleanBuild'], function (cb) {
  return gulp.src('')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

gulp.task('sass', function() {
  gulp.src('./source/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./www/css'));
});

gulp.task('watch', function () {
  gulp.watch('./source/jsx/**/*.jsx', ['build']);
  gulp.watch('./source/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);