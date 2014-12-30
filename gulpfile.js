var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat-sourcemap');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var notify = require("gulp-notify");

var paths = {
  sass: ['./scss/**/*.scss'],
  ts: ['./src/**/*.ts'],
  html: ['./src/**/*.html'],
  test: ['./www/test/**/*.js']
};

gulp.task('default', ['clean', 'sass', 'ts', 'tslint', 'html']);

var clean = require('gulp-clean');
gulp.task('clean', function () {
  return gulp.src(['www/css', 'www/js', 'www/test'], {read: false})
    .pipe(clean());
});

var sourcemaps = require('gulp-sourcemaps');
gulp.task('sass', function (done) {
  gulp.src(['./scss/*.scss'])
    .pipe(sourcemaps.init({debug: true}))
    .pipe(sass({sync: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

var ts = require('gulp-typescript');
var eventStream = require('event-stream');
gulp.task('ts', function () {
  var tsResult = gulp.src(['./src/*.ts', './src/**/*.ts', './typings/**/*.d.ts', '*.d.ts', '!src/**/*.spec.ts'])
    .pipe(sourcemaps.init({debug: true}))
    .pipe(ts({
      // set this to true if your project is strict with types
      noImplicitAny: false,
      removeComments: true,
      module: 'commonjs',
      target: 'ES5',
      sortOutput: true,
      declarationFiles: true,
      noExternalResolve: true
    }));

  var tsTestResult = gulp.src(['./src/*.ts', './src/**/*.ts', './typings/**/*.d.ts', '*.d.ts'])
    .pipe(sourcemaps.init({debug: true}))
    .pipe(ts({
      // set this to true if your project is strict with types
      noImplicitAny: false,
      removeComments: true,
      module: 'commonjs',
      target: 'ES5',
      sortOutput: true,
      declarationFiles: true,
      noExternalResolve: true
    }));

  return eventStream.merge(
    tsResult.js.pipe(concat('app.js')).pipe(sourcemaps.write()).pipe(gulp.dest('./www/js')),
    tsTestResult.js.pipe(concat('tests.js')).pipe(sourcemaps.write()).pipe(gulp.dest('./www/test'))
  );
});

var plumber = require('gulp-plumber');
var tslint = require('gulp-tslint');
gulp.task('tslint', function () {
  gulp.src(['src/**/*.ts', '!src/definitions/**/*.ts'])
    .pipe(tslint())
    .pipe(notify(function (file) {
      if (file.tslint.failureCount === 0) {
        // Don't show something if success
        return false;
      }
      var errors = JSON.parse(file.tslint.output).map(function (data) {
        if (data.failure) {
          return file.relative + '[' + data.startPosition.line + ',' + data.startPosition.character + ']: ' + data.failure + ' (' + data.ruleName + ')';
        }
      });
      return file.relative + " (" + errors.length + " errors)\n" + errors.join("\n");
    }))
});

var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(sourcemaps.init({debug: true}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({standalone: true}))
    .pipe(concat('templates.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js'));
});

var karma = require('gulp-karma');
gulp.task('test', function (done) {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('tdd', function (done) {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('watch', ['clean', 'watch-tasks']);

gulp.task('watch-tasks', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['ts', 'tslint']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.test, ['tdd']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
