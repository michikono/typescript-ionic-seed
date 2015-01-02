var gulp = require('gulp');
var argv = require('yargs').argv; // for args parsing
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat-sourcemap');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');

var testFilePattern = 'src/**/*.spec.ts';
var paths = {
  e2e: ['src/**/*.e2e.ts', './lib/definitions/e2e-definitions/**/*.d.ts'],
  sass: ['./assets/scss/**/*.scss', './assets/scss/*.scss'],
  ts: ['./src/*.ts', './src/**/*.ts', '!./lib/definitions/e2e-definitions/**/*.d.ts'],
  tsds: ['*.d.ts', './tsd/**/*.d.ts', './src/*.d.ts', './src/**/*.d.ts', './lib/definitions/**/*.d.ts', '!./lib/definitions/e2e-definitions/**/*.d.ts', '!./src/**/*.e2e.ts'],
  html: ['./src/**/*.html'],
  lib: ['./bower_components/ionic/js/ionic.bundle.js'],
  fonts: ['./bower_components/ionic/fonts/*', './assets/fonts/*'],
  index: ['./assets/index.html'],
  images: ['./assets/images/*'],
  test: ['./www/test/unit.js']
};

gulp.task('default', ['ts', 'tsTest', 'tsE2E', 'html', 'lib', 'sass', 'fonts', 'images', 'index', 'tslint']);

/*
 * this task re-builds the project before watching it
 */
gulp.task('watch', function () {
  var p;

  gulp.watch('gulpfile.js', spawnChildren);
  spawnChildren();

  function spawnChildren(e) {
    // kill previous spawned process
    if (p) {
      p.kill();
    }

    // `spawn` a child `gulp` process linked to the parent `stdio`
    p = spawn('gulp', ['watch-tasks'], {stdio: 'inherit'});
  }
});

gulp.task('watch-tasks', function () {
  gulp.watch(paths.e2e, ['tsE2E']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts.concat(paths.tsds), ['ts', 'tsTest', 'tslint']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.lib, ['lib']);
  gulp.watch(paths.test, ['tdd']);
})

/*
 * purges all generated files
 */
var clean = require('gulp-clean');
gulp.task('clean', ['cleanCss', 'cleanHtml', 'cleanFonts', 'cleanImages', 'cleanIndex']);
gulp.task('cleanCss', function () {
  return gulp.src(['./www/css'], {read: false})
    .pipe(clean());
});
gulp.task('cleanFonts', function () {
  return gulp.src(['./www/fonts'], {read: false})
    .pipe(clean());
});
gulp.task('cleanImages', function () {
  return gulp.src(['./www/images'], {read: false})
    .pipe(clean());
});
gulp.task('cleanHtml', function () {
  return gulp.src(['./www/js/template.js'], {read: false})
    .pipe(clean());
});
gulp.task('cleanIndex', function () {
  return gulp.src(['./www/index.html'], {read: false})
    .pipe(clean());
});

/*
 * copies important external dependencies into the working folder
 */
gulp.task('lib', function () {
  return gulp.src(paths.lib)
    .pipe(sourcemaps.init({debug: true}))
    .pipe(concat('lib.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js'));
});

/*
 * copies fonts from external dependencies
 */
gulp.task('fonts', ['cleanFonts'], function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./www/fonts'));
});

/*
 * copies images from external dependencies
 */
gulp.task('images', ['cleanImages'], function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./www/images'));
});

/*
 * copies index.html from assets folder
 */
gulp.task('index', ['cleanIndex'], function () {
  return gulp.src(paths.index)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www'));
});

/*
 * compiles CSS from SCSS
 */
gulp.task('sass', ['cleanCss'], function (done) {
  gulp.src(paths.sass)
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

/*
 * Compiles TypeScript
 */
var ts = require('gulp-typescript');
var eventStream = require('event-stream');
var tsProject = ts.createProject({
  noImplicitAny: false,
  removeComments: true,
  module: 'commonjs',
  target: 'ES5',
  sortOutput: true,
  declarationFiles: false,
  noExternalResolve: true
});
gulp.task('ts', function () {
  var tsResult = gulp.src(paths.ts.concat(paths.tsds, ['!' + testFilePattern]))
    .pipe(sourcemaps.init({debug: true}))
    .pipe(ts(tsProject))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js'))
});

var tsTestProject = ts.createProject({
  noImplicitAny: false,
  removeComments: false,
  module: 'commonjs',
  target: 'ES5',
  sortOutput: true,
  declarationFiles: false,
  noExternalResolve: true
});
gulp.task('tsTest', ['ts'], function () {
  return gulp.src(paths.tsds.concat(paths.ts))
    .pipe(sourcemaps.init({debug: true}))
    .pipe(ts(tsTestProject))
    .pipe(concat('unit.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/test'))
});

var tsE2EProject = ts.createProject({
  noImplicitAny: false,
  removeComments: false,
  module: 'commonjs',
  target: 'ES5',
  sortOutput: true,
  declarationFiles: false,
  noExternalResolve: true
});
gulp.task('tsE2E', ['ts'], function () {
  return gulp.src(paths.e2e)
    .pipe(sourcemaps.init({debug: true}))
    .pipe(ts(tsE2EProject))
    .pipe(concat('e2e.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/test'))
});

/*
 * runs TypeScript linter
 */
var plumber = require('gulp-plumber');
var tslint = require('gulp-tslint');
gulp.task('tslint', ['tsTest'], function () {
  gulp.src(['src/**/*.ts', '!src/**/*.d.ts'])
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

/*
 * Stringifies all templates
 */
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
gulp.task('html', ['cleanHtml'], function () {
  return gulp.src(paths.html)
    .pipe(sourcemaps.init({debug: true}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({standalone: true}))
    .pipe(concat('templates.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js'));
});

/*
 * runs tests
 */
var karma = require('gulp-karma');
gulp.task('test', ['tsTest'], function (done) {
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

/*
 * Runs autotest watcher
 */
gulp.task('tdd', ['tsTest'], function (done) {
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
