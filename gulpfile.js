'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task(function css() {
  return gulp.src('app/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError(function (error) {
      return {
        title: 'sass',
        message: error.message
      }
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});

gulp.task(function assets() {
  return gulp.src('assets/**', {since: gulp.lastRun('assets')})
    .pipe(newer('public'))
    .pipe(debug({title: 'assets'}))
    .pipe(gulp.dest('public'));
});

gulp.task(function cordovaCss() {
  return gulp.src('public/css/**')
    .pipe(newer('cordova/www'))
    .pipe(debug({title: 'cordovaCss'}))
    .pipe(gulp.dest('cordova/www/css'));
});

gulp.task(function cordovaJs() {
  return gulp.src('public/js/**')
    .pipe(newer('cordova/www'))
    .pipe(debug({title: 'cordovaJs'}))
    .pipe(gulp.dest('cordova/www/js'));
});

gulp.task('cordovaBuild', gulp.series(gulp.parallel('cordovaCss', 'cordovaJs')));

gulp.task(function clean() {
  return del('public')
});

gulp.task('bundle', function () {
  return browserify({entries: 'app/js/app.jsx', extensions: ['.jsx'], debug: true})
    .transform('babelify', {presets: ['es2015', 'react', 'stage-0']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task(function watch() {
  gulp.watch('app/**/*.scss', gulp.series('css'));
  gulp.watch('app/**/*.jsx', gulp.series('bundle'));
  gulp.watch('assets/**', gulp.series('assets'));
});

gulp.task('webserver', function() {
  browserSync.init({
    server: './public',
    port: 8899
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(gulp.parallel('assets', 'css', 'bundle'), gulp.parallel('webserver', 'watch')));

gulp.task('build', gulp.series('clean', gulp.parallel('assets', 'css'), 'watch'));
