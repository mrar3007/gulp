const gulp = require('gulp'); // подключаем галп
const browserSync = require('browser-sync').create(); //
const watch = require('gulp-watch');
const scss = require('gulp-scss');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', function(callback) {
    return gulp.src('./app/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css/'))
    callback();
});

gulp.task('watch', function(callback) {
    watch(['./app/*.html', './app/css/**/*.css'], gulp.parallel( browserSync.reload ));
    
    watch('./app/scss/**/*.scss', gulp.parallel( 'scss' ));
    
    callback();
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    })
});

gulp.task('default', gulp.parallel('server', 'watch', 'scss'));