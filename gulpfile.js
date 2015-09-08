var babel = require('babel/register');
var gulp = require('gulp');
var coveralls = require('gulp-coveralls');
var mocha = require('gulp-mocha');

gulp.task('test', require('gulp-jsx-coverage').createTask({
    src: ['test/*.js'],  // will pass to gulp.src as mocha tests
    istanbul: {                                      // will pass to istanbul
        coverageVariable: '__MY_TEST_COVERAGE__',
        exclude: /node_modules|test[0-9]/            // do not instrument these files
    },

    threshold: 20,                                   // fail the task when coverage lower than this
                                                     // default is no threshold
    thresholdType: 'functions',                      // one of 'lines', 'statements', 'functions', 'banches'
                                                     // default is 'lines'

    transpile: {                                     // this is default whitelist/blacklist for transpilers
        babel: {
            include: /\.jsx?$/,
            exclude: /node_modules/,
            omitExt: false                           // if you wanna omit file ext when require(), put an array
        }                                            // of file exts here. Ex: ['.jsx', '.es6'] (NOT RECOMMENDED)                                           // of file exts here. Ex: ['.coffee'] (NOT RECOMMENDED)
    },
    coverage: {
        reporters: ['text-summary', 'json', 'lcov'], // list of istanbul reporters
        directory: 'coverage'                        // will pass to istanbul reporters
    },
    mocha: {                                         // will pass to mocha
        reporter: 'spec'
    },
    babel: {                                         // will pass to babel
        sourceMap: 'both'                            // get hints in covarage reports or error stack
    },

    //optional
    cleanup: function () {
        process.exit();
        // do extra tasks after test done
        // EX: clean global.window when test with jsdom
    }
}));
gulp.task('coveralls', function() {
    return gulp.src('coverage/lcov.info')
        .pipe(coveralls());
});
gulp.task('simple', function () {
	return gulp.src('test/component/*.js')
		.pipe(mocha({
            compilers: {
                js: babel
            },
            reporter: 'spec'
        }));
});
gulp.task('default', ['test']);