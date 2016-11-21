'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var base64 = require('gulp-base64');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');

var scripts = [
    'vendor/angular/angular.min.js',
    'vendor/jquery/dist/jquery.min.js',
    'vendor/angular-route/angular-route.min.js',
    'vendor/angular-loader/angular-loader.min.js',
    'vendor/angular-upload/angular-upload.min.js',

    'app/scripts/_*.js',
    'app/scripts/*.js',
    'app/scripts/**/_*.js',
    'app/scripts/**/*.js',
    'app/scripts/**/components/*.js',
    'app/*.js'
];
var styles = [
    // 'app/styles/*.scss',
    // 'app/styles/**/*.scss', 'styles/**/*.scss',
    'vendor/angular-upload/src/directives/btnUpload.min.css',
    'vendor/normalize.css/normalize.css',
    'vendor/bootstrap/dist/css/bootstrap.min.css'
];

var stylesLess = ['app/styles/index.less'];

var images = ['app/images/svg/*.svg'];
var templatesDir = 'app/scripts/**/*.html';

var server;

gulp.task('images', function() {
    return gulp.src(images)
        .pipe(imagemin({
            svgoPlugins: [{
                removeHiddenElems: false
            }]
        }))
        .pipe(rename({
            prefix: 'eui-icon-'
        }))
        .pipe(svgstore({}))
        .pipe(gulp.dest('app/dist/images'));
});


gulp.task('templates', function() {
    gulp.src(templatesDir)
        .pipe(templateCache({
            standalone: true,
            root: '/app/scripts/',
            module: 'employees.templates'
        }))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('scripts', function() {
    gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/dist'));
});

var cssStream = gulp.src(styles)
    .pipe(concat('app.css'));

var lessStream = gulp.src(stylesLess)
    .pipe(less())
    .pipe(concat('less-files.less'));

gulp.task('styles', function() {
    var mergedStream = merge(lessStream, cssStream)
        .pipe(concat('app.css'))
        .pipe(base64({
            baseDir: './app/styles'
        }))
        .pipe(gulp.dest('app/dist'));

    return mergedStream;
});
// gulp.task('styles', function() {
//     gulp.src(styles)
//         .pipe(concat('app.css'))
//         // .pipe(sass({
//         //     errLogToConsole: true
//         // }))
//         .pipe(base64({
//             baseDir: './app/styles'
//         }))
//         .pipe(gulp.dest('app/dist'));
// });

gulp.task('server', function(next) {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    server = connect();
    server.use(serveStatic('./app')).listen(process.env.PORT || 9000, next);
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

    gulp.watch(['pages/*.html', './index.html']).on('change', function(file) {
        livereload.changed(file.path);
    });
});

gulp.task('release', ['images', 'scripts', 'styles', 'templates'], function() {
    var pjson = require('./package.json');

    gulp.src('app/images/*.png')
        .pipe(gulp.dest('release/v' + pjson.version + '/images'));

    gulp.src('app/styles/_*.scss')
        .pipe(gulp.dest('release/v' + pjson.version + '/styles'));

    gulp.src('app/dist/app.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename = 'employees';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));
    gulp.src('app/dist/base.css')
        .pipe(rename(function(path) {
            path.basename = 'employees';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));
    gulp.src('app/dist/images/icons-sprite.svg')
        .pipe(rename(function(path) {
            path.basename = 'employees.sprite';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));

    gulp.src('app/dist/templates.js')
        .pipe(rename(function(path) {
            path.basename = 'employees.templates';
        }))
        .pipe(gulp.dest('release/v' + pjson.version));
});
