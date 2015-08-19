var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var path = {
    scss : {
        src : 'dev/scss/**/*.scss',
        dest : 'assets/css'
    },
    js : {
        src : 'dev/js/**/*.js',
        dest : 'assets/js'
    }
};

gulp.task('sass', function(){
    return gulp.src( path.scss.src )
                .pipe( sourcemaps.init() )
                .pipe( sass().on('error', sass.logError) )
                .pipe( sourcemaps.write() )
                .pipe( gulp.dest(path.scss.dest) )
});

gulp.task('js', function(){
    gulp.src( path.js.src )
        .pipe( sourcemaps.init() )
        .pipe( concat('leveridge.js') )
        .pipe( uglify() ).on('error', function(){ console.log('uglify error'); })
        .pipe( gulp.dest( path.js.dest ) );
});


gulp.task('watch', function(){
    livereload.listen();

    gulp.watch(path.scss.src, ['sass']);
    gulp.watch(path.js.src, ['js']);

});