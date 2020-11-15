const gulp = require('gulp'); // подключаем галп
const browserSync = require('browser-sync').create(); //
const watch = require('gulp-watch');

gulp.task('watch', function(callback) {
    watch(['./app/*.html', './app/css/*.css'], gulp.parallel( browserSync.reload ));
    callback();
})

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    })
});

gulp.task('default', gulp.parallel('server', 'watch'));