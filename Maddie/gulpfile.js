const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');

const paths = {
  html: __dirname + '/app/**/*.html',
  js:__dirname + '/app/js/client.js',
  test:__dirname + '/test/*_test.js'
};


gulp.task('clean', () => {
  return del('./build/**/*');
});

gulp.task('copy', () => {
  return gulp.src(paths.html)
  .pipe(gulp.dest('./build'));
});

gulp.task('bundle', ['clean'], () => {
  return gulp.src(paths.js)
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('build', ['copy', 'clean', 'bundle']);

gulp.task('bundle:test', () => {
  return gulp.src(paths.test)
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    },
    module: {
      loaders: [{
        test:/\.html$/,
        loader:'html'
      }]
    }
  }))
  .pipe(gulp.dest('./test'));
});
