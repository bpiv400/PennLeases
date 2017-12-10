var gulp = require('gulp');
var eslint = require('gulp-eslint');
var zip = require('gulp-zip');

var FILES = [
  'middlewares/*.js',
  'routes/*.js',
  'data/*.js',
  'public/javascripts/create.js',
  'public/javascripts/index.js',
  'public/javascripts/success.js',
  'public/javascripts/view.js',
  'search/src/actions/*.js',
  'search/src/components/*.js',
  'search/src/initialState.js',
  'search/src/index.js',
  'search/src/App.js',
  'app.js'
];

gulp.task('eslint', function () {
  return gulp.src(FILES)
    .pipe(eslint({}))
    .pipe(eslint.format());
});

gulp.task('zip', function () {
  return gulp.src(FILES, { base: '.' })
    .pipe(zip('files.zip'))
    .pipe(gulp.dest(''));
});
