import fs           from 'fs';
import path         from 'path';
import babelify     from 'babelify';
import browserify   from 'browserify';
import browserSync  from 'browser-sync';
import gulp         from 'gulp';
import nodemon      from 'gulp-nodemon';
import rename       from 'gulp-rename';
import rm           from 'gulp-rm';
import sass         from 'gulp-sass';
import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleancss     from 'gulp-clean-css';
import uglify       from 'gulp-uglify';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import watchify     from 'watchify';
import envify       from 'envify';

const server = 'http://localhost:8080';
const dirs = {
  public    : 'public',
  build     : 'public/build',
  assets    : 'public/assets',
  lib       : 'lib',
  src       : 'src',
  sass      : 'src/sass',
  jsx       : 'src/jsx',
};
const files = {
  server: 'server.js',
  bundle: 'bundle.js',
  vendor: 'vendor.js',
  style : 'style.css',
  lib   : `${dirs.lib}/index.js`,
  js    : `${dirs.src}/index.js`,
  scss  : `${dirs.src}/style.scss`,
  index : `${dirs.assets}/index.html`,
};
const vendorLibs = ['react', 'react-dom', 'react-router', 'jquery'];

gulp.task('skel',done => {
  const make = (p, m, f) => new Promise((resolve, reject) => {
    fs.stat(p, (err, stat) => {
      if (stat) resolve(gutil.log(`${m} ${gutil.colors.yellow(p)} already exists`));
      else f(resolve, reject);
    });
  });
  const mkdir = list => Promise.all(list.map(p => make(dirs[p], 'Directory', (resolve, reject) => {
    fs.mkdir(dirs[p], err => err ? reject(err) : resolve());
  })));
  const writeFile = list => Promise.all(list.map(p => make(files[p], 'File', (resolve, reject) => {
    fs.writeFile(files[p], '', err => err ? reject(err) : resolve());
  })));

  mkdir(['src', 'lib', 'public'])
    .then(() => mkdir(['jsx', 'sass','build', 'assets']))
    .then(() => writeFile(['server', 'lib', 'js', 'scss', 'index']))
    .then(() => done());
});

gulp.task('dev:vendor', () => {
  const b = browserify();
  vendorLibs.forEach(e => b.require(e));
  return b
    .bundle()
    .on('error', err => gutil.log('Browserify Error:', err.message))
    .pipe(source(files.vendor))
    .pipe(gulp.dest(dirs.build));
  }
);

gulp.task('build:vendor', () => {
  const b = browserify().transform(envify);
  vendorLibs.forEach(e => b.require(e));
  return b
    .bundle()
    .on('error', err => gutil.log('Browserify Error:', err.message))
    .pipe(source(files.vendor))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dirs.build));
  }
);

gulp.task('dev:js', () => {
  const b = browserify(Object.assign({}, watchify.args, {
    entries: files.js,
    plugin: [watchify],
    debug: true
  }))
    .transform(babelify, {
      plugins: [
        'transform-class-properties',
        'transform-object-rest-spread'
      ],
      presets: ['react', 'es2015']
  });
  vendorLibs.forEach(e => b.external(e));

  const bundle = () => b
    .bundle()
    .on('error', err => gutil.log('Browserify Error:', err.message))
    .pipe(source(files.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./', {sourceRoot: ''}))
    .pipe(gulp.dest(dirs.build));

  b.on('log', gutil.log);
  b.on('update', bundle);

  return bundle();
});

gulp.task('build:js', () => {
  const b = browserify({
    entries: [files.js],
    debug: true
  })
  .transform(babelify, {
    plugins: ['transform-class-properties', 'transform-object-rest-spread'],
    presets: ['react', 'es2015']
  })
  .transform(envify);
  vendorLibs.forEach(e => b.external(e));
  return b.bundle()
    .on('error', err => gutil.log('Browserify Error:', err.message))
    .pipe(source(files.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./', {sourceRoot: ''}))
    .pipe(gulp.dest(dirs.build));
  }
);

gulp.task('dev:sass', () => gulp
  .src(files.scss)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./', {sourceRoot: dirs.src}))
  .pipe(gulp.dest(dirs.build))
);

gulp.task('build:sass', () => gulp
  .src(files.scss)
  .pipe(sourcemaps.init())
  .pipe(sass({includePaths: [ 'lib/', 'mod/' ]}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cleancss())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./', {sourceRoot: dirs.src}))
  .pipe(gulp.dest(dirs.build))
);

gulp.task('dev', ['dev:vendor', 'dev:js', 'dev:sass'], (done) => {
  const bs = browserSync.create();
  bs.init({
    open: false,
    notify: false,
    proxy: server,
    reloadDebounce: 1500,
    reloadDelay: 1500
  });

  nodemon({
    script: files.server,
    watch: [`${dirs.lib}/**/*`, `${dirs.jsx}/**/*.js*(x)`],
    ext: 'js jsx',
    env: {NODE_PATH: dirs.src}
  });

  gulp.watch([`${dirs.sass}/**/*`, files.scss], ['dev:sass']);
  gulp.watch(`${dirs.public}/*/**`, e => {
    bs.reload(path.relative(dirs['public'], e.path).replace(/.*?\//, ''));
  });
});

gulp.task('build', ['clean', 'build:vendor', 'build:js', 'build:sass']);

gulp.task('clean', () => gulp
  .src(`${dirs.build}/**/*`, {read: false})
  .pipe(rm({async: false}))
);
