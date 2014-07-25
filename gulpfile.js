var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    gulp.src('./src/js/shindig.js')
        .pipe(uglify())
        .pipe(rename('shindig.min.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', [ 'scripts' ]);