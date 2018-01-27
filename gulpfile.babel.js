import gulp from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import del from 'del';
import babel from 'gulp-babel';

const paths = require('./package').paths;

// clean application scripts
gulp.task('clean:scripts', () => del(`${paths.app.scripts.out.path}/${paths.app.scripts.out.filename}*`));

// build application scripts
gulp.task('scripts', ['clean:scripts'], () => {
    gulp.src(paths.app.scripts.in)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat(paths.app.scripts.out.filename))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.app.scripts.out.path))
});

// watch for application scripts changes
gulp.task('watch:scripts', () => gulp.watch(paths.app.scripts.in, ['scripts']));

// watch for application changes
gulp.task('watch', ['watch:scripts']);

// build application
gulp.task('build', ['scripts']);