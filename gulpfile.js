const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('babel-server', () => {
    gulp.src('server/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', console.error.bind(console))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});
gulp.task('copy-schemas', () => {
    gulp.src([
        'graphqls',
        'json',
    ].map(ext => `server/**/*.${ext}`))
        .pipe(gulp.dest('dist/'))
});

gulp.task('build', ['babel-server', 'copy-schemas']);
gulp.task('build-watch', () => {
    watch('server/**/*', {ignoreInitial: false}, () => {
        gulp.start('build')
    })
});
