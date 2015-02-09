var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var del = require('del');
var plumber = require('gulp-plumber');
var svgstore = require('gulp-svgstore');
var csscomb = require('gulp-csscomb');	//TODO: use that, there is already config
var csscomb = require('gulp-load-plugins');	//TODO: use that

gulp.task('minifyImg', ['concatSvg'], function () {
	return gulp.src(['./assets/img/**/*.png', './assets/img/**/*.jpg', './assets/img/sprite.svg'])
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./assets/img'));
});

gulp.task('concatSvg', [], function () {
	return gulp.src(['./assets/img/icons/**/*.svg', '!./assets/img/sprite.svg', '!./assets/img/inlined'])
		.pipe(plumber())
		.pipe(svgstore({
			fileName: 'sprite.svg',
			transformSvg: function ($svg, done) {
				// $svg.find('[fill]').removeAttr('fill');
				// $svg.find('style').remove();
				done(null, $svg)
			}
		}))
		.pipe(gulp.dest('./assets/img'));
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

gulp.task('removeSpriteSvg', function (cb) {
	del([
		'./assets/img/sprite.svg'
	], cb);
});

gulp.task('styles', ['sass', 'autoprefixer', 'minifyCss']);

gulp.task('watch', [], function () {
	gulp.watch('./assets/img/**/*', ['minifyImg']);
	gulp.watch('./sass/**/*', ['styles']);
	gulp.watch('gulpfile.js', ['default']);
});

gulp.task('default', ['minifyImg', 'styles']);