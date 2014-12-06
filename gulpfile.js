var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cssBase64 = require('gulp-css-base64');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var del = require('del');
var plumber = require('gulp-plumber');

gulp.task('minifyImg', [], function () {
	return gulp.src('./assets/img/**/*')
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./assets/img'));
});

gulp.task('inlineSvg', ['minifyCss'], function () {
	return gulp.src('./assets/css/*.css')
		.pipe(plumber())
		// .pipe(sourcemaps.init({
		// 	loadMaps: true
		// }))
		.pipe(cssBase64())
		// .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('sass', ['removeCss'], function () {
	return gulp.src('./sass/*.scss')
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			errLogToConsole: true
		}))
		// .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('autoprefixer', ['sass'], function () {
	return gulp.src('./assets/css/*.css')
		.pipe(plumber())
		// .pipe(sourcemaps.init({
		// 	loadMaps: true
		// }))
		.pipe(autoprefixer())
		// .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('minifyCss', ['autoprefixer'], function () {
	return gulp.src('./assets/css/*.css')
		.pipe(plumber())
		// .pipe(sourcemaps.init({
		// 	loadMaps: true
		// }))
		.pipe(csso())
		// .pipe(sourcemaps.write('.'))
		.pipe(rename(function(path){
			if (path.extname === '.css') {
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('removeCss', function (cb) {
	del([
		'./assets/css/*'
	], cb);
});

gulp.task('styles', ['sass', 'autoprefixer', 'minifyCss', 'inlineSvg']);

gulp.task('watch', [], function () {
	gulp.watch('./assets/img/**/*', ['minifyImg']);
	gulp.watch('./sass/**/*', ['styles']);
	gulp.watch('gulpfile.js', ['default']);
});

gulp.task('default', ['minifyImg', 'styles']);