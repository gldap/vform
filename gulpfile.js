var {src,dest,task, series, parallel} = require('gulp');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var terser = require('gulp-terser');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');


//browser tasks
function watch() {
  browserSync.init ({
    server: {
      baseDir: './dist',
      port: 3000
    }
  });
  gulp.watch('src/*.html, src/images/**').on('change', browserSync.reload);
}
function reload(done){
  browserSync.reload();
  done();
}
function copyHtml(){
  return src('./src/*.html')
  .pipe(gulp.dest('dist'));
}
function htmlMin () {
  return src('./src/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest('dist'));
}
function imgTask() {
  return src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'))
}

function jsTask(){
  return src("src/js/*.js",{allowEmpty: true})
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/js'));
}
function cssTask(){
  return src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
}
/*function cssTask() {
  return src('src/css/*.css')
  .pipe(sourcemaps.init())
  .pipe(concat('styles.css'))
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'));
}

function cssTask() {
  return src('src/css/*.css')
    .pipe(sourcemaps.init())

    .pipe(postcss([autoprefixer(), cssnano()])) //not all plugins work with postcss only the ones mentioned in their documentation
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}
*/

exports.cssTask = cssTask;
exports.watch = watch;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.htmlMin = htmlMin;
exports.jsTask = jsTask;
