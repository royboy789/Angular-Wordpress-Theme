'use strict';
var gulp = require( 'gulp' ),

    autoprefixer = require( 'gulp-autoprefixer' ),
    minify = require( 'gulp-minify-css' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    notify = require( 'gulp-notify' ),
    exec = require('child_process').exec,
    watch = require( 'gulp-watch' );

gulp.task( 'sass', function () {
    gulp.src( './src/assets/scss/style.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass().on( 'error', notify.onError( function ( error ) {
            return error.message;
        } ) ) )
        .pipe( autoprefixer( {
            browsers : [ 'last 2 versions' ],
            cascade  : false
        } ) )
        .pipe( gulp.dest( './src/assets/css' ) )
        .pipe( minify() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( './src/assets/css' ) )
} );

gulp.task( 'ngBuild', function(cb) {
    exec('ng build', {maxBuffer: 1024 * 500}, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task( 'watch', function() {

    gulp.watch( './src/assets/scss/**/*.scss', ['sass'] );
    gulp.watch( './src/assets/app/**/*.ts', ['ngBuild'] );

});