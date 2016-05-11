var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-cssnano');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var prefixr = require('gulp-autoprefixer');
var connect = require('gulp-connect');

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

gulp.task('webserver', ['styles'] , function() {
  connect.server({
    livereload: true,
    root: [ '.']
  });
});

/* Compile Our Sass */
gulp.task('styles', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(prefixr("last 1 version", "> 1%", "ie 8"))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/css'))
        // .pipe(gzip(gzip_options))
        // .pipe(gulp.dest('static/css'))
        .pipe(livereload());
});


/* Compile Our Javascript */
gulp.task('vendor', function() {
    return gulp.src('static/js/*.min.js')
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('static/js'))
        .pipe(livereload());
});

/* Compile Our Javascript */
gulp.task('scripts', function() {
    return gulp.src('static/js/myjs.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/js'))
        .pipe(livereload());
});

/* Compile Our Sass */
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(prefixr("last 1 version", "> 1%", "ie 8"))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/css'))
        // .pipe(gzip(gzip_options))
        // .pipe(gulp.dest('static/css'))
        .pipe(livereload());
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('static/js/myjs.js', ['scripts']);

    /* Trigger a live reload on any Django template changes */
    gulp.watch('index.html').on('change', livereload.changed);
});

gulp.task('default', ['sass', 'scripts', 'watch']);

gulp.task('build', ['vendor']);
