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
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/systemjs/dist/system-polyfills.js',
			'node_modules/angular2/bundles/angular2-polyfills.js',
			'node_modules/angular2/bundles/http.min.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/rxjs/bundles/Rx.js',
			'node_modules/angular2/bundles/angular2.dev.js'
		]),
		concat('angular-scripts.min.js'),
		gulp.dest('./build/js')
	]);
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

gulp.task('default', ['js', 'typescript', 'scss']);
