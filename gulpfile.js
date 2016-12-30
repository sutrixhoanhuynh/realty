'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    getSassStream,
    source = {
      theme: 'wp-content/themes/Avenue/',
      css: 'wp-content/themes/Avenue/css/',
      js: 'wp-content/themes/Avenue/js/',
      image: 'wp-content/themes/Avenue/images/*.{png,jpg,gif}'
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
  return gulp.src(source.theme + '*.{css, js}', {read: false})
        .pipe(clean());
});

gulp.task('compress', function () {
  return gulp.src(source.theme + 'script.js')
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

function buildSass (name) {
  return getSassStream()
  .pipe(sass().on('error', sass.logError))
  .pipe(concat(name))
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: false
  }));
}

gulp.task('css', function () {
  return buildSass('style.css').pipe(gulp.dest(source.theme));
});

gulp.task('css-min', function () {
  return buildSass('style.min.css').pipe(gulp.dest(source.theme));
});

getSassStream = function() {
  return gulp.src([
    source.css + '/base/variables.scss',
    source.css + '/base/colors.scss',
    source.css + '/helpers/mixins.scss',
    source.css + '/components/fontface.scss',
    source.css + '/components/app.scss',
    source.css + '/**/*.scss',
    source.css + '/routes/**/*.scss'
  ]);
};

gulp.task('build-css', ['clean', 'css']);


gulp.task('default', ['clean', 'concat', 'autoprefixer']);
