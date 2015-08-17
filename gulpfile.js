var gulp = require('gulp');
var harp = require('harp');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var includeSources = require('gulp-include-source');
var deploy = require('gulp-gh-pages');

var shell = require('gulp-shell');


gulp.task('html', function() {
  return gulp.src( './_harp/_indexTemplate/index.html' )
  .pipe(includeSources())
  .pipe(gulp.dest('./_harp'))
  .pipe(browserSync.stream());
});


gulp.task('harp', ['html'], function () {
  return gulp.src('')
  .pipe(shell([
    'harp compile _harp dist'
  ]))
  .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('./_harp/javascript/**/*', ['harp']);
    gulp.watch('./_harp/**/*.html', ['harp']);
    gulp.watch('./_harp/sass/**/*.scss', ['harp']);
  });

// mostly taken from http://charliegleason.com/articles/harp-gulp-and-browsersync
/**
 * Serve the Harp Site
 */
gulp.task('serve', function () {
  harp.server('./dist', {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });

    gulp.watch('./_harp/javascript/**/*', ['harp']);
    gulp.watch('./_harp/**/*.html', ['harp']);
    gulp.watch('./_harp/sass/**/*.scss', ['harp']);

  });
});


/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['html', 'harp'], function () {
  return gulp.src("./dist/**/*")
  .pipe(deploy());
});

gulp.task('default', ['harp']);