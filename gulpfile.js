var gulp = require('gulp');
var mocha = require('gulp-mocha');
var docco = require("gulp-docco");

gulp.task('buildDocs', function() {
  return gulp.src('./src/**/*.js')
    .pipe(docco())
    .pipe(gulp.dest('docs'));
});

gulp.task('test', function () {
  return gulp.src('tests/**/*.js', {read: false})
    .pipe(mocha());
});
