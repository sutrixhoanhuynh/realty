'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    source = {
      theme: 'wp-content/themes/Avenue/',
      css: 'wp-content/themes/Avenue/css/',
      js: 'wp-content/themes/Avenue/js/'
    };

gulp.task('concat', function() {

  gulp.src([
    source.js + 'l10n.js',
    source.js + 'site.js',
    source.js + 'plugins/*.js'
  ])
  .pipe(concat('script.js'))
  .pipe(gulp.dest(source.theme));

  gulp.src([
    source.js + 'libs/jquery.js',
    source.js + 'libs/plugins/*.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(source.theme));

});

gulp.task('clean', function () {
  return gulp.src([source.theme + '*.js'], {read: false})
        .pipe(clean());
});

gulp.task('compress', function () {
  return gulp.src([source.theme + 'script.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(source.theme));
});

gulp.task('autoprefixer', function () {
  return gulp.src(source.theme + '*.css')
        .pipe(autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        }))
        .pipe(gulp.dest(source.theme));
});

gulp.task('csslint', function () {

});

gulp.task('jshint', function () {

});

gulp.task('dev', ['clean', 'concat', 'autoprefixer']);
