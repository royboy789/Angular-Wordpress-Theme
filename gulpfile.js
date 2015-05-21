var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('sass', function(){
	gulp.src('assets/scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css'));
	return gulp.src('assets/css/*.css')
		.pipe(minifyCss({compatibility:'ie8'}))
		.pipe(gulp.dest('build/css/'));
	
});


gulp.task('js', function(){
	gulp.src('assets/js/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('angular', function(){
	gulp.src([
		'node_modules/tinymce/tinymce.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/angular-resource/angular-resource.min.js',
		'node_modules/angular-ui-router/build/angular-ui-router.min.js',
		'node_modules/angular-ui-tinymce/src/tinymce.js',
	])
	.pipe(concat('angular.min.js'))
	.pipe(gulp.dest('build/js'));
	
	gulp.src([
		'node_modules/angular/angular.min.js.map', 
		'node_modules/angular-resource/angular-resource.min.js.map'
	])
	.pipe(gulp.dest('build/js'));
	
	gulp.src([
		'node_modules/tinymce/themes/modern/*.js',
	])
	.pipe(gulp.dest('build/js/themes/modern/'));
	
	gulp.src([
		'node_modules/tinymce/skins/lightgray/*.css',
	])
	.pipe(gulp.dest('build/js/skins/lightgray'));
})


gulp.task('init', ['sass', 'js', 'angular']);
gulp.task('default', ['sass','js']);