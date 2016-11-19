'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var base64 = require('gulp-base64');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

var scripts = ['emias-ui/scripts/*.js', 'emias-ui/scripts/**/_*.js', 'emias-ui/scripts/**/*.js', 'scripts/*.js'];
var styles = ['emias-ui/styles/*.scss', 'emias-ui/styles/**/*.scss', 'styles/**/*.scss'];
var images = ['emias-ui/images/svg/*.svg'];
var templatesDir =  'emias-ui/scripts/**/*.html';

var server;

gulp.task('images', function () {
    return gulp.src(images)
        .pipe(imagemin({
            svgoPlugins: [
                { removeHiddenElems: false }
            ]
        }))
        .pipe(rename({prefix: 'eui-icon-'}))
        .pipe(svgstore({ }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('templates', function () {
    gulp.src(templatesDir)
        .pipe(templateCache({standalone: true, root: '/emias-ui/scripts/', module: 'emias.ui.templates'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    gulp.src(['emias-ui/styles/base.scss'])
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(base64({ baseDir: './emias-ui/styles' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function(next) {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    server = connect();
    server.use(serveStatic('./')).listen(process.env.PORT || 9000, next);
});

gulp.task('run', ['images', 'scripts', 'styles', 'server'], function() {

    gulp.watch(images, ['images']).on('change', function(file) {
        livereload.changed(file.path);
    });

    gulp.watch(scripts, ['scripts']).on('change', function(file) {
        livereload.changed(file.path);
    });

    gulp.watch(styles, ['styles']).on('change', function(file) {
        livereload.changed(file.path);
    });

    gulp.watch('pages/*.html').on('change', function(file) {
        livereload.changed(file.path);
    });
});

gulp.task('release', ['images', 'scripts', 'styles', 'templates'], function () {
    var pjson = require('./package.json');

    gulp.src('emias-ui/images/*.png')
        .pipe(gulp.dest('release/v' + pjson.version + '/images'));

    gulp.src('emias-ui/styles/_*.scss')
        .pipe(gulp.dest('release/v' + pjson.version + '/styles'));

    gulp.src('dist/app.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename = 'emias.ui';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));
    gulp.src('dist/base.css')
        .pipe(rename(function (path) {
            path.basename = 'emias.ui';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));
    gulp.src('dist/images/icons-sprite.svg')
        .pipe(rename(function (path) {
            path.basename = 'emias.ui.sprite';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));

    gulp.src('dist/templates.js')
        .pipe(rename(function (path) {
            path.basename = 'emias.ui.templates';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));
});