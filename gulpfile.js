var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

var tasks = [];

['classic', 'clean'].forEach(function (style) {

    var task = style + 'Style';
    tasks.push(task);

    gulp.task(task, function () {
        return gulp.src('./src/scss/' + style + '.scss')
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(cssnano())
            .pipe(gulp.dest('./css'));
    });

});

tasks.push('scripts');
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('jquery.columns.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('default', [], function () {
    gulp.start.apply(gulp, tasks);
});
