var gulp         = require('gulp');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var notify       = require('gulp-notify');
var browserSync  = require('browser-sync').create();
var merge        = require('merge-stream');
var gulpconfig   = require('./gulpconfig.js');

gulp.task('compile:js', function(cmd) {

    var tasks = [];

    for(var type in gulpconfig.paths.script) {
        if (gulpconfig.paths.script.hasOwnProperty(type)) {
            var t = gulpconfig.paths.script[type];

            /** Multiple folders! */
            if (!t.hasOwnProperty('src')) {
                for (var subType in t) {
                    if (t.hasOwnProperty(subType)) {
                        var sub = t[subType];

                        if (typeof sub.src === 'object') {
                            for(var s in sub.src) {
                                if (sub.src.hasOwnProperty(s)) {
                                    tasks.push(makeTask(sub.src[s], sub.base, sub.dest[s]))
                                }
                            }
                        } else {
                            tasks.push(makeTask(sub.src, sub.base, sub.dest));
                        }

                    }
                }

            /** Single folder */
            } else {
                tasks.push(makeTask(t.src, t.base, t.dest));
            }
            
        }

    }

    return tasks;
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

gulp.task('watch:js', ['compile:js'], function() {
    gulp.watch(gulpconfig.paths.script.src, { interval: 500 }, ['compile:js']);
});
gulp.task('watch:scss', ['compile:scss'], function() {
    gulp.watch(gulpconfig.paths.style.src, { interval: 500 }, ['compile:scss']);
});

gulp.task('browser-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['serve']);
gulp.task('compile', ['compile:js', 'compile:scss']);




function makeTask(src, base, dest) {

    task = gulp
        .src(src, { base: base })
        // .pipe(eslint(gulpconfig.options.eslint))
        // .pipe(eslint.format())
        // .pipe(eslint.failOnError())
        // .pipe(concat(dest))
        .pipe(uglify(gulpconfig.options.script))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());

    return task;
}
