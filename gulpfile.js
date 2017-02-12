var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

gulp.task('sass', function () {
  gulp.src('development/sass/**/sass.scss')
    .pipe(sass().on('error', sass.logError))
      .pipe(rename('dev.css'))
    .pipe(gulp.dest('development/css'));
});
 
gulp.task('autoprefixer', function () {
    return gulp.src('development/css/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        flexbox: true,
        cascade: false
      }))
      .pipe(gulp.dest('development/css'))
      .pipe(livereload());;
});

gulp.task('minify-css', function() {
  return gulp.src('development/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('production/css'))
});

gulp.task('move-html', function() {
  return gulp.src('development/*.html')
    .pipe(gulp.dest('production'))
});

gulp.task('move-js', function() {
  return gulp.src('development/js/**/*.*')
    .pipe(gulp.dest('production/js'))
});

gulp.task('move-src', function() {
  return gulp.src('development/src/**/*.*')
    .pipe(gulp.dest('production/src'))
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('development/sass/**/*.scss', ['sass']);
  gulp.watch('development/css/*.css', ['autoprefixer'] );
});

gulp.task('build', ['minify-css', 'move-html', 'move-js', 'move-src']);




