var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

var path = {
    scss : {
        src : 'dev/scss/**/*.scss',
        dest : 'assets/css'
    }
};

gulp.task('sass', function(){
    return gulp.src( path.scss.src )
                .pipe( sourcemaps.init() )
                .pipe( sass().on('error', sass.logError) )
                .pipe( sourcemaps.write() )
                .pipe( gulp.dest(path.scss.dest) )

});


gulp.task('watch', function(){
    livereload.listen();

    gulp.watch(path.scss.src, ['sass']);
});