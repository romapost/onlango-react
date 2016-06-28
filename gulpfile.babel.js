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

import config       from './config';

const server = `http://localhost:${config.port}`;
const dirs = {
  public    : 'public',
  build     : 'public/build',
  assets    : 'public/assets',
  lib       : 'lib',
  src       : 'src',
  sass      : 'src/sass'
};
const files = {
  server: 'server.js',
  bundle: 'bundle.js',
  vendor: 'vendor.js',
  style : 'main.css',
  lib   : `${dirs.lib}/index.js`,
  js    : `${dirs.src}/index.jsx`,
  scss  : `${dirs.src}/main.scss`,
};
const vendorLibs = [
  'babel-polyfill',
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux',
  'redux-actions',
  'redux-thunk',
  'react-bootstrap',
  'react-router-bootstrap',
  'react-dropzone',
  'superagent'
];
const sassIncludePaths = ['node_modules/', 'src/sass'];

const index = (props = {}) => {
  const min = config.dev ?  '' : '.min';
  const defaults = {
    title: 'App',
    styles: [
      `/main${min}.css`,
      'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
      'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css',
    ],
    scripts: [
      `/vendor${min}.js`,
      `/bundle${min}.js`,
    ]
  };

  const get = (p, map, tab) => {
    const val = p in props ? props[p] : defaults[p];
    return typeof map == 'function' ? Array.prototype.concat(val).map(map).join(`\n${tab}`) : val;
  };

  const style = href => `<link rel="stylesheet" href="${href}">`;
  const script = src => `<script src="${src}"></script>`;

  return `<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no shrink-to-fit=no" name="viewport" />
    <title>${get('title')}</title>
    ${get('styles', style, '    ')}
  </head>
  <body>
    <div id="app"></div>
    ${get('scripts', script, '    ')}
  </body>
</html>
`;
};

gulp.task('index', () => {
  fs.writeFile(`${dirs.assets}/index.html`, index());
});

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
    .then(() => mkdir(['build', 'assets']))
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
    entries: [files.js]
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
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dirs.build));
  }
);

gulp.task('dev:sass', () => gulp
  .src(files.scss)
  .pipe(sourcemaps.init())
  .pipe(sass({includePaths: sassIncludePaths}).on('error', sass.logError))
  .pipe(sourcemaps.write('./', {sourceRoot: dirs.src}))
  .pipe(gulp.dest(dirs.build))
);

gulp.task('build:sass', () => gulp
  .src(files.scss)
  .pipe(sass({includePaths: sassIncludePaths}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cleancss())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(dirs.build))
);

gulp.task('dev', ['dev:vendor', 'dev:js', 'dev:sass', 'index'], (done) => {
  const bs = browserSync.create();
  bs.init({
    open: false,
    notify: false,
    ui: false,
    port: config.port + 1,
    proxy: server,
    reloadDebounce: 1500,
    reloadDelay: 1500
  });

  nodemon({
    script: files.server,
    watch: `${dirs.lib}/**/*`
  }).on('start', () => {
    setTimeout(() => { bs.reload() }, 1500);
  });

  gulp.watch([`${dirs.sass}/**/*`, files.scss], ['dev:sass']);
  gulp.watch(`${dirs.public}/!(uploads)**/!(*.map)`, e => {
    bs.reload(path.relative(dirs['public'], e.path).replace(/.*?\//, ''));
  });
});

gulp.task('build', ['clean', 'build:vendor', 'build:js', 'build:sass', 'index']);

gulp.task('clean', () => gulp
  .src(`${dirs.build}/**/*`, {read: false})
  .pipe(rm({async: false}))
);
