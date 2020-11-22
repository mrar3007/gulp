const gulp = require('gulp'); // подключаем галп
const browserSync = require('browser-sync').create(); //
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gcmp = require('gulp-group-css-media-queries');

gulp.task('sass', function(callback) {
    return gulp.src('./app/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            indentType: "tab",
            indentWidth: 1,
            outputStyle: "expanded"
        }))
        .pipe(gcmp())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css/'))
});

gulp.task('watch', function(callback) {
    watch(['./app/*.html', './app/css/**/*.css'], gulp.parallel( browserSync.reload ));
    
    watch('./app/scss/**/*.scss', gulp.parallel( 'sass' ));
    
    callback();
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    })
});

gulp.task('default', gulp.series('watch', 'sass','server'));