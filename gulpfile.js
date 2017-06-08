var gulp         = require('gulp');
var uglify       = require('gulp-uglify');
var eslint       = require('gulp-eslint');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var notify       = require('gulp-notify');
var browserSync  = require('browser-sync').create();
var merge        = require('merge-stream');
var gulpconfig   = require('./gulpconfig.js');

gulp.task('compile:js', function(){
	return gulp
		.src(gulpconfig.paths.script.src, { base: gulpconfig.paths.script.base })
		.pipe(eslint(gulpconfig.options.eslint))
		.pipe(eslint.format())
		// .pipe(eslint.failOnError())
		.pipe(uglify(gulpconfig.options.script))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(gulpconfig.paths.script.dest))
		.pipe(browserSync.stream());
		// .pipe(notify(gulpconfig.notifications.script));
});

gulp.task('compile:scss', function() {
	var tasks = gulpconfig.paths.style.folders.map(function(folder){
		return gulp
			.src(folder + 'scss/*.scss', { base: folder + 'scss' })
			.pipe(sass(gulpconfig.options.style)).on('error', notify.onError({
				title: gulpconfig.notifications.style.error.title,
				message: gulpconfig.notifications.style.error.message,
				icon: gulpconfig.notifications.style.error.icon
			}))
			.pipe(autoprefixer())
			.pipe(gulp.dest(folder))
			.pipe(browserSync.stream());
			// .pipe(notify(gulpconfig.notifications.style));
	});

	return merge(tasks);
});

gulp.task('serve', ['compile:js', 'compile:scss'], function() {
	browserSync.init({
		open:      false,
		proxy:     gulpconfig.paths.project.protocol + gulpconfig.paths.project.proxy,
		port:      8080,
		ghostMode: false,
		files: [
			"content/themes/**/*.css"
		],
		snippetOptions: {
			whitelist: ['/wp-admin/admin-ajax.php']
		}
	});

	gulp.watch(gulpconfig.paths.script.src, { interval: 500 }, ['compile:js']);
	gulp.watch(gulpconfig.paths.style.src, { interval: 500 }, ['compile:scss']);
	gulp.watch([
		gulpconfig.paths.project.base + "/**/*.php",
		gulpconfig.paths.project.base + "/content/plugins/**/*.js",
		gulpconfig.paths.project.base + "/content/themes/**/*.js"
	], { interval: 500 }, ['browser-reload']);
});

gulp.task('watch', ['compile:js', 'compile:scss'], function() {
	gulp.watch(gulpconfig.paths.script.src, { interval: 500 }, ['compile:js']);
	gulp.watch(gulpconfig.paths.style.src, { interval: 500 }, ['compile:scss']);
});

gulp.task('browser-reload', function() {
	browserSync.reload();
});

gulp.task('default', ['serve']);
gulp.task('compile', ['compile:js', 'compile:scss']);
