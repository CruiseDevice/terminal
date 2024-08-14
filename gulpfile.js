const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// Task to compile TypeScript files
gulp.task('scripts', function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

// Task to copy HTML files
gulp.task('copy-html', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

// Task to copy CSS files
gulp.task('copy-style', function () {
  return gulp.src('style.css')
    .pipe(gulp.dest('dist'));
});

// Task to copy images folder
gulp.task('copy-images', function () {
  return gulp.src('images')
    .pipe(gulp.dest('dist'));
});

// Default task to run both tasks
gulp.task('default', gulp.series('scripts', 'copy-html', 'copy-style', 'copy-images'));