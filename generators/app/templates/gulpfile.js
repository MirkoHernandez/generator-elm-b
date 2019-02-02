'use strict';

// Gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var elm  = require('gulp-elm');
// var less = require('gulp-less');

// Required by gulp
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Rollup plugins
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var rollup = require('rollup-stream');
var postcss = require('rollup-plugin-postcss');


var packageJSON = require('./package.json');
var dependencies = Object.keys(packageJSON && packageJSON.dependencies || {});

// Browser-sync
var del = require('del');
var browserSync = require('browser-sync').create()

// Watch Options (usePolling is required if gulp is running inside VM, and changes to files are executed from the host).
var watchOptions = {
    usePolling: true,
}

// Paths
var paths = {
    index: {  
	src: './src/index.html',
	dest: './dist'
    },
    styles: {  
	src: './styles/**/*.scss',
	dest: './dist/css/'
    },
    dist: {
	src: './dist/**/*'
    },
    elmFiles: {
	src: './src/**/*.elm',
	dest: './dist',
    },
};


function styles() {
  return gulp.src(paths.styles.src)
	.pipe(sass())
	.pipe(gulp.dest(paths.styles.dest));
}

function clean() {
  return del([ 'dist' ]);
}

function elmCompile() {
  return gulp.src(paths.elmFiles.src)
	.pipe(elm.bundle('elm.js',{ optimize: true,filetype:'js' }))
	.pipe(gulp.dest(paths.elmFiles.dest));
}
function copyIndex() {
    return gulp.src(paths.index.src)
	.pipe(gulp.dest(paths.index.dest));
}


var cache;
gulp.task('rollup', function() {
    return rollup('rollup.config.js')
	.on('bundle', function(bundle) {
	    cache = bundle;
	})
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./dist'));
});

function watch () {
    browserSync.init({
	server: {
            baseDir: "dist/"
        },
	    open: false
    });
    gulp.watch(paths.index.src,watchOptions, copyIndex);
    // gulp.watch(paths.styles.src,watchOptions, styles)
    gulp.watch(paths.styles.src,watchOptions, gulp.series('rollup'));
    gulp.watch(paths.elmFiles.src,watchOptions, elmCompile);
    gulp.watch(paths.dist.src,watchOptions).on( 'change', browserSync.reload );
}


exports.styles = styles;
exports.elm = elmCompile;
exports.watch = watch;
exports.copyIndex = copyIndex;
exports.clean = clean;
exports.init  = gulp.series(copyIndex,elmCompile,gulp.series('rollup'))
