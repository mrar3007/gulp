const gulp = require('gulp'); // подключаем галп
const browserSync = require('browser-sync').create(); //
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const gcmp = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');
const fileinclude = require('gulp-file-include');

gulp.task('html', function(cb) {
    return gulp.src('./app/html/*.html')
        .pipe( fileinclude({
            prefix: '@@'
        }) )
        .pipe( gulp.dest('./app/') );
    cb();
})

gulp.task('sass', function(callback) {
    return gulp.src('./app/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
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
    
    watch('./app/html/**/*.html', gulp.parallel( 'html' ));

    callback();
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    })
});

gulp.task('default', gulp.series('html', 'watch', 'sass', 'server'));