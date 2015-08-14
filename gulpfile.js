var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

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
	
	gulp.src([
		'node_modules/tinymce/skins/lightgray/fonts/*',
	])
	.pipe(gulp.dest('build/js/skins/lightgray/fonts'));
})

gulp.task('bootstrap-js', function(){
	gulp.src([
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js'
	])
	.pipe(concat('bootstrap.js'))
	.pipe(gulp.dest('build/js'));
});

gulp.task('watch', function(){
	gulp.watch('assets/scss/*.scss', ['sass']);
	gulp.watch('assets/js/*.js', ['js']);
})


gulp.task('init', ['sass', 'js', 'angular', 'bootstrap-js']);
gulp.task('default', ['sass','js']);