var gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps'),
	tscConfig = require('./tsconfig.json'),
	sass = require('gulp-sass'),
	pump = require('pump'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

var appSrc = './assets/',
	tsSrc = appSrc + 'typescript/';


gulp.task('scss', function() {
	gulp.src(appSrc + '**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('js', function() {
	pump([
		gulp.src([
			'node_modules/es6-shim/es6-shim.min.js',
			'node_modules/core-js/client/smin.min.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/reflect-metadata/Reflect.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/rxjsgul/bundles/Rx.js',
		]),
		concat('angular-scripts.min.js'),
		gulp.dest('./build/js')
	]);
	pump([
		gulp.src([
			'node_modules/@angular/core/bundles/core.umd.js',
			'node_modules/@angular/common/bundles/common.umd.js',
			'node_modules/@angular/compiler/bundles/compiler.umd.js',
			'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
			'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'node_modules/@angular/http/bundles/http.umd.js',
			'node_modules/@angular/forms/bundles/forms.umd.js',
			'node_modules/@angular/upgrade/bundles/upgrade.umd.js',
		]),
		gulp.dest('./build/js/angular')
	])
});

gulp.task('typescript', function () {
	gulp
		.src(tsSrc + '**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript(tscConfig.compilerOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function() {
	gulp.watch(tsSrc + '**/*.ts', ['typescript']);
	gulp.watch(appSrc + 'css/*.css', ['css']);
});

gulp.task('default', ['js', 'typescript', 'scss', 'watch']);
