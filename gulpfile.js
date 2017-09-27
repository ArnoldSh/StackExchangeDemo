'use strict';
var gulp    =   require('gulp'),
    concat  =   require('gulp-concat'),
    uglify  =   require('gulp-uglify'),
    pump    =   require('pump'),
    minCss  =   require('gulp-clean-css');

var sourceSet = {
    'thirdParty': {
        'js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/tablesorter/dist/js/jquery.tablesorter.js',
            'node_modules/popper.js/dist/umd/popper.js',
            'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        'css': [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/components-font-awesome/css/font-awesome.css',
            'node_modules/tablesorter/dist/css/theme.bootstrap.min.css'
        ],
        'fonts': [
            'node_modules/components-font-awesome/fonts/*.*'
        ],
        'images': []
    },
    'app': {
        'js': 'src/js/*.js',
        'css': 'src/css/*.css',
        'images': 'src/images/*.*',
        'fonts': []
    }
};

var buildSet = {
    'names': {
        'js': 'app.min.js',
        'css': 'app.min.css'
    },
    'dist': {
        'js': 'web/js',
        'css': 'web/css',
        'fonts': 'web/fonts',
        'images': 'web/images'
    }
};

gulp.task('copy-js', function(callback) {
    pump(
        [
            gulp.src(sourceSet['thirdParty']['js'].concat(sourceSet['app']['js'])),
            concat(buildSet['names']['js']),
            uglify(),
            gulp.dest(buildSet['dist']['js'])
        ],
        callback
    );
});

gulp.task('copy-css',  function(callback) {
    pump(
        [
            gulp.src(sourceSet['thirdParty']['css'].concat(sourceSet['app']['css'])),
            concat(buildSet['names']['css']),
            minCss(),
            gulp.dest(buildSet['dist']['css'])
        ],
        callback
    );
});

gulp.task('copy-fonts',  function(callback) {
    pump(
        [
            gulp.src(sourceSet['thirdParty']['fonts'].concat(sourceSet['app']['fonts'])),
            gulp.dest(buildSet['dist']['fonts'])
        ],
        callback
    );
});

gulp.task('copy-images',  function(callback) {
    pump(
        [
            gulp.src(sourceSet['thirdParty']['images'].concat(sourceSet['app']['images'])),
            gulp.dest(buildSet['dist']['images'])
        ],
        callback
    );
});

gulp.task('default', ['copy-js', 'copy-css', 'copy-fonts', 'copy-images']);
gulp.task('build', ['default']);