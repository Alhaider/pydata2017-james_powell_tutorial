var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var browserify = require('browserify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var gutil = require('gulp-util')
var del = require('del')
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
var duration = require('gulp-duration')
var argv = require('yargs').argv
var gulpif = require('gulp-if')
var uglify = require('gulp-uglify')
var envify = require('envify/custom')

function handleErrors(error) {
    notify.onError({
        title:   'Build Error',
        message: '<%= error.message %>'
    })(error)
    this.emit('end')
}

function build() {
    del(['./static/js/bundle.*'])
    browserify({
        entries: './src/index.js',
        debug: !argv.prod,
    })
    .transform(babelify)
    .transform(envify({'NODE_ENV': argv.prod ? 'production' : 'development'}), {global: true})
    .bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(duration('bundle time'))
    .pipe(buffer())
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./static/js'))
    .pipe(notify({
        title:   'Build Success',
        message: 'Built at <%= new Date() %>!',
        onLast:   true
    }))
}

function watch() {
    gulp.watch('./src/**/*.js', ['build'])
}

gulp.task('build', build)
gulp.task('watch', function() {
    build()
    watch()
})
gulp.task('default', ['watch'])
