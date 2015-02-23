var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
//TODO: use gulp-csscomb, it's already included(and there is config)

gulp.task('minifyImg', ['concatSvg'], function () {
	return gulp.src(['./assets/img/**/*.png', './assets/img/**/*.jpg', './assets/img/sprite.svg'])
		.pipe(plugins.plumber())
		.pipe(plugins.imagemin({
			progressive: true,
			svgoPlugins: [{
				cleanupIDs: false
			}]
		}))
		.pipe(gulp.dest('./assets/img'));
});

gulp.task('concatSvg', [], function () {
	return gulp.src(['./assets/img/icons/**/*.svg', '!./assets/img/sprite.svg', '!./assets/img/icons/inlined/**'])
		.pipe(plugins.plumber())
		.pipe(plugins.svgstore({
			fileName: 'sprite.svg'
		}))
		.pipe(gulp.dest('./assets/img'));
});

gulp.task('sass', ['removeCss'], function () {
		return gulp.src('./sass/*.scss')
		.pipe(plugins.plumber())
		// .pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			outputStyle: 'expanded',
			errLogToConsole: true
		}))
		// .pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('sass', ['removeCss'], function () {
	return gulp.src('./sass/*.scss')
		.pipe(plugins.plumber())
		// .pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			outputStyle: 'expanded',
			errLogToConsole: true
		}))
		// .pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('autoprefixer', ['sass'], function () {
	return gulp.src('./assets/css/*.css')
		.pipe(plugins.plumber())
		// .pipe(plugins.sourcemaps.init({
		// 	loadMaps: true
		// }))
		.pipe(plugins.autoprefixer())
		// .pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('cssInlineImg', ['autoprefixer', 'minifyImg'], function () {
	return gulp.src('./assets/css/*.css')
		.pipe(plugins.plumber())
		// .pipe(plugins.sourcemaps.init({
		// 	loadMaps: true
		// }))
		.pipe(plugins.cssBase64())
		// .pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('minifyCss', ['cssInlineImg'], function () {
	return gulp.src('./assets/css/*.css')
		.pipe(plugins.plumber())
		// .pipe(plugins.sourcemaps.init({
		// 	loadMaps: true
		// }))
		.pipe(plugins.csso())
		// .pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.rename(function(path){
			if (path.extname === '.css') {
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.reload({stream: true}));
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

gulp.task('styles', ['minifyCss']);

gulp.task('watch', [], function () {
	gulp.watch('./assets/img/**/*', ['minifyImg']);
	gulp.watch('./sass/**/*', ['styles']);
	gulp.watch('gulpfile.js', ['default']);
});

gulp.task('default', ['minifyImg', 'styles']);

gulp.task('server', ['default'], function () {
	browserSync({
		server: './'
	});

	gulp.watch('./assets/img/**/*', ['minifyImg']);
	gulp.watch('./sass/**/*', ['styles']);
	gulp.watch('*.html').on('change', browserSync.reload);
});