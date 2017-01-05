var gulp = require('gulp');
var less = require('gulp-less');
var uglifycss = require('gulp-uglifycss');
var watch = require('gulp-watch');

gulp.task('less', function(){
	gulp.src('src/less/style.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
});

gulp.task('uglify', function(){
	gulp.src('src/css/style.css')
		.pipe(uglifycss({
			"maxLineLen": 80,
			"uglyComments": true
		}))
		.pipe(gulp.dest('css'))
});

gulp.task('watch', function(){
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/css/*.css', ['uglify']);
});

gulp.task('default', ['watch']);