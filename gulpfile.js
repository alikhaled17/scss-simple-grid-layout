var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    souecemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    zip = require('gulp-zip');

gulp.task('compress', function () {
    return gulp.src('dist/**/*.*')
        .pipe(zip('app.zip'))
        .pipe(gulp.dest('.'))
        .pipe(notify('Files is compressed!'));
})


gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch('project/*.pug', function () {
        return gulp.src('project/*.pug')
            .pipe(souecemaps.init())
            .pipe(pug({ pretty: true }))
            .pipe(concat('index.html'))
            .pipe(souecemaps.write('.'))
            .pipe(gulp.dest('dist'))
            .pipe(notify('Task is done!'))
            .pipe(livereload());
    });
    gulp.watch('project/css/*.scss', function () {
        return gulp.src('project/css/*.scss')
            .pipe(souecemaps.init())
            .pipe(sass())
            .pipe(prefix('last 2 versions'))
            .pipe(concat('main.css'))
            .pipe(souecemaps.write('.'))
            .pipe(gulp.dest('dist/css'))
            .pipe(notify('Task is done!'))
            .pipe(livereload());
    });
    gulp.watch('project/js/*.js', function () {
        return gulp.src('project/js/*.js')
            //.pipe(souecemaps.init())
            .pipe(concat('main.js'))
            //.pipe(souecemaps.write('.'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .pipe(livereload());
    });

});



