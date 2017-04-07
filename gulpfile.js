'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    csslint = require('gulp-csslint'),
    autoprefixer = require('gulp-autoprefixer'),
    source = {
      theme: 'wp-content/themes/Avenue/',
      css: 'wp-content/themes/Avenue/css/',
      js: 'wp-content/themes/Avenue/js/',
      image: 'wp-content/themes/Avenue/images/*.{png,jpg,gif}'
    };

gulp.task('clean', function() {
  return gulp.src(source.theme + '*.{css,js}', {read: false})
  .pipe(clean());
});

gulp.task('js', function() {
  getJSource()
  .pipe(concat('script.js'))
  .pipe(gulp.dest(source.theme));
});

gulp.task('js-min', function() {
  getJSource()
  .pipe(uglify())
  .pipe(concat('script.min.js'))
  .pipe(gulp.dest(source.theme));
});

gulp.task('css', function() {
  buildSass('style.css').pipe(gulp.dest(source.theme));
});

gulp.task('css-min', function () {
  buildSass('style.min.css')
  .pipe(cssmin())
  .pipe(gulp.dest(source.theme));
});

gulp.task('css-lint', function () {
  gulp.src(source.theme + '*.css')
  .pipe(csslint())
  .pipe(csslint.formatter());
});


function buildSass(name) {
  return getSassStream()
  .pipe(sass().on('error', sass.logError))
  .pipe(concat(name))
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: false
  }));
}

function getSassStream() {
  return gulp.src([
    source.css + '/base/variables.scss',
    source.css + '/base/colors.scss',
    source.css + '/helpers/*.scss',
    source.css + '/components/fontface.scss',
    source.css + '/components/app.scss',
    source.css + '/**/*.scss',
    source.css + '/routes/**/*.scss'
  ]);
}

function getJSource() {
  return gulp.src([
    source.js + 'libs/jquery.js',
    source.js + 'libs/plugins/*.js',
    source.js + 'l10n.js',
    source.js + 'site.js',
    source.js + 'plugins/*.js'
  ]);
}

gulp.task('dev', ['clean', 'css', 'js']);

gulp.task('build', ['clean', 'css-min', 'js-min']);

gulp.task('default', function() {
  gulp.watch(source.css + '**/*.scss', ['css']);
  gulp.watch(source.js + '**/*.js', ['js']);
});
