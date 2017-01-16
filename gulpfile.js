var gulp = require('gulp');
var del = require('del');
var path = require('path');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watch = require('gulp-watch');
var cache = require('gulp-cache');

var projectPath = 'dest/wp-content/themes/thinkovery';
var comingSoonPath = 'dest/coming-soon';


var report_error = function(error) {
    $.notify({
        title: 'An error occured with a Gulp task',
        message: 'Check you terminal for more informations'
    }).write(error);

    console.log(error.toString());
    this.emit('end');
};

gulp.task('styles', function () {
    return gulp.src('src/scss/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({ precision: 6, outputStyle: 'compressed', sourceComments: false, indentWidth: 4 }))
        .on('error', report_error)
        .pipe($.autoprefixer({ browsers: ['> 5%'] }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(projectPath+'/css'))
        .pipe(gulp.dest(comingSoonPath+'/css'))
        .pipe($.size({title: 'styles'}));
});

gulp.task('bower', function() {
    return gulp.src('src/js/libs/**/*')
        .pipe(gulp.dest(projectPath+'/js/libs'))
        .pipe($.size({ title: 'bower' }));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest(projectPath+'/fonts'))
        .pipe(gulp.dest(comingSoonPath+'/fonts'))
        .pipe($.size({ title: 'fonts' }));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache($.imagemin()))
        .pipe(gulp.dest(projectPath+'/img'))
        .pipe($.size({ title: 'img' }));
});

gulp.task('layoutImg', function() {
    return gulp.src('src/layoutImg/**/*')
        .pipe(cache($.imagemin()))
        .pipe(gulp.dest(projectPath+'/layoutImg'))
        .pipe($.size({ title: 'layoutImg' }));
});

gulp.task('js', function () {
    return browserify('src/js/main.js', {debug: true}).bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(projectPath+'/js'));
});

gulp.task('theme', function() {
    return gulp.src('src/theme/**/*')
    // .pipe($.prettify({ indent_size: 4 }))
    .pipe(gulp.dest(projectPath))
    .pipe($.size({title: 'theme'}));
});


gulp.task('watch', function () {
    browserSync({ notify: false, proxy: 'localhost' });

    watch('src/scss/**/*', function(){
        gulp.start(['styles'], reload);
    });
    watch('src/theme/**/*', function(){
        gulp.start(['theme'], reload);
    });
    watch('src/fonts/**/*', function(){
        gulp.start(['fonts'], reload);
    });
    watch('src/img/**/*', function(){
        gulp.start(['img'], reload);
    });
    watch('src/layoutImg/**/*', function(){
        gulp.start(['layoutImg'], reload);
    });
    watch('src/js/**/*', function(){
        gulp.start(['js', 'bower'], reload);
    });

    var fileWatcher = watch('src/**/*').on('unlink', function(currentPath){
        var filePathFromSrc = path.relative(path.resolve('src'), currentPath);
        var destFilePath = path.resolve('dest', filePathFromSrc).replace('templates/', '');
        del.sync(destFilePath);
        console.log('File removed - ' + destFilePath);
    });
});

gulp.task('start', ['styles', 'theme', 'fonts', 'img', 'layoutImg', 'js', 'bower']);
