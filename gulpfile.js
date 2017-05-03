const gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jasmineNode = require('gulp-jasmine-node');

// create a default task and just log a message
gulp.task('default', () => {
    return gulp.src('tests/inverted-index-test.js').pipe(jasmineNode());
});