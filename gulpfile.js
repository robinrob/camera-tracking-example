var root = require('path').resolve('./')

var browserSync = require('browser-sync')
var gulp = require('gulp')
var gutil = require('gulp-util');
var watch = require('gulp-watch')

var config = {
    paths: {
        html: {
            src: ['index.html']
        }
    }
}
config.paths.watch = [
    ...config.paths.html.src
]

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
}

var ERROR_LEVELS = ['error', 'warning'];

// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf('error');
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
    console.log('error: ' + JSON.stringify(error.message, null, '\t'))

    gutil.log(error.message);
    if (isFatal(level)) {
        //process.exit(0);
    }
}

// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}
// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);}


gulp.task('reload', function (done) {
    browserSync.reload()
    done()
})

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        browser: 'Google\ Chrome\ Canary'
    })
})

gulp.task('dev-build', gulp.series('reload'))

gulp.task('dev-watch', function () {
  return watch(config.paths.watch, gulp.series('dev-build'))
})

gulp.task('default', gulp.parallel('dev-watch', 'browser-sync'))