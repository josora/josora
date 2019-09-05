(() => {

  'use strict';

  //** Gulp.js 4 configuration **//
  const
    // Modules
    gulp          = require('gulp'), // Gulp of-course
    // CSS Related
    sass          = require('gulp-sass'), // Gulp pluign for Sass compilation.
    minifycss     = require('gulp-uglifycss'), // Minifies CSS files.
    autoPrefixer  = require('gulp-autoprefixer'), // Autoprefixing magic.
    mmq           = require('gulp-merge-media-queries'), // Combine matching media queries into one media query definition.
    sourceMaps    = require('gulp-sourcemaps'), // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
    // JS Related
    concat        = require('gulp-concat'), // Concatenates JS files
    uglify        = require('gulp-uglify'), // Minifies JS files
    // Browser Syn Related
    browserSync   = require('browser-sync').create(), // Reloads browser and injects CSS. Time-saving synchronised browser testing.
    reload        = browserSync.reload, // For manual browser reload.
    // Image Related
    imageMin      = require('gulp-imagemin'), // Minify PNG, JPEG, GIF and SVG images with imagemin.
    // Utility Related
    notify        = require('gulp-notify'), // Sends message notification to you.
    rename        = require('gulp-rename'), // Renames files E.g. style.css -> style.min.css
    lineec        = require('gulp-line-ending-corrector'), // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)
    filter        = require('gulp-filter'), // Enables you to work on a subset of the original files by filtering them using globbing.
    // Tranlastion Related
    wpPot         = require('gulp-wp-pot'), // For generating the .pot file.
    sort          = require('gulp-sort'), // Recommended to prevent unnecessary changes in pot-file.


    // Directory Locations
    dir = {
      sassSrc    : './assets/sass/style.sass',
      sassWatch  : './assets/sass/**/*.sass',
      cssDest    : './assets/css/',
      phpSrc     : './**/*.php',
      jsVendor   : './assets/js/vendor/*.js',
      jsCustom   : './assets/js/custom/*.js',
      jsDest     : './assets/js/',
      jsVFile    : 'vendors',
      jsCFile    : 'custom',
      imgSrc     : './assets/images/raw/**/*.{png,jpg,gif,svg}',
      imgDest    : './assets/images/',
      projectUrl : 'localhost/dimack'
    },

    // Tranlate Settings
    translateOpts = {
      textDomain     : 'ccs',
      destFile       : 'ccs.pot',
      destDir        : './languages',
      packageName    : 'ccs',
      bugReport      : 'https://crew.pt/contact/',
      lastTranslator : 'Pedro Josora <pedro.josora@gmail.com>',
      team           : 'Crew <info@crew.pt>'
    },

    // CSS Settings
    cssOpts = {
      src         : dir.sassSrc,
      watch       : dir.sassWatch,
      build       : dir.cssDest,
      sassOpts : {
        outputStyle     : 'compact',
        precision       : 10,
        errLogToConsole : true
      },
    },

    // Server Settings
    browserSyncConfig = {
      proxy         : dir.projectUrl,
      port          : 8000,
      open          : true,
      injectChanges : true
    },

    // Autoprefixer Settings
    autoPrefixerOpts = [
      'last 2 version',
      '> 1%',
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4',
      'bb >= 10'
    ];

  // - CSS Task - //
  function css() {
    sass.compiler = require('node-sass');
    return gulp.src(cssOpts.src)
      .pipe(sourceMaps.init())
      .pipe(sass(cssOpts.sassOpts).on('error', sass.logError))
      .pipe(sourceMaps.write({includeContent: false}))
      .pipe(sourceMaps.init({loadMaps: true}))
      .pipe(autoPrefixer( autoPrefixerOpts ))
      .pipe(sourceMaps.write('./'))
      .pipe(lineec())
      .pipe(gulp.dest(cssOpts.build))
      .pipe(filter('**/*.css'))
      .pipe(mmq({log: true}))
      .pipe(browserSync.stream())
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss({maxLineLen: 10}))
      .pipe(lineec())
      .pipe(gulp.dest(cssOpts.build))
      .pipe(filter('**/*.css'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe(notify({message: 'TASK: CSS Completed! 💯', onLast: true } ));

  }
  exports.css = gulp.series(css);

  // - JS Vendor Task - //
  function jsVendor() {
    return gulp.src(dir.jsVendorSRC)
      .pipe(concat(dir.jsVFile + '.js'))
      .pipe(lineec())
      .pipe(gulp.dest(dir.jsDest))
      .pipe(rename({basename: dir.jsVFile, suffix: '.min'}))
      .pipe(uglify())
      .pipe(lineec())
      .pipe(gulp.dest(dir.jsDest))
      .pipe(notify({message: 'TASK: Vendors.js Completed! 💯', onLast: true}));
  }
  exports.jsVendor = gulp.series(jsVendor);

  // - JS Custom Task - //
  function jsCustom() {
    return gulp.src(dir.jsCustomSRC)
      .pipe(concat(dir.jsCFile + '.js'))
      .pipe(lineec())
      .pipe(gulp.dest(dir.jsDest))
      .pipe(rename({basename: dir.jsCFile, suffix: '.min'}))
      .pipe(uglify())
      .pipe(lineec())
      .pipe(gulp.dest(dir.jsDest))
      .pipe(notify({message: 'TASK: Custom.js Completed! 💯', onLast: true}));
  }
  exports.jsCustom = gulp.series(jsCustom);

  // - Images Task - //
  function images() {
    return gulp.src(dir.imgSrc)
      .pipe(imageMin({
        progressive: true,
        optimizationLevel: 3, // 0-7 low-high
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}]
      }))
      .pipe(gulp.dest(dir.imgDes))
      .pipe(notify({message: 'TASK: Images Completed! 💯', onLast: true}));
  }
  exports.images = gulp.series(images);

  // - Translate - //
  function translate() {
    return gulp.src(dir.phpSrc)
      .pipe(sort())
      .pipe(wpPot( {
          domain         : translateOpts.textDomain,
          package        : translateOpts.packageName,
          bugReport      : translateOpts.bugReport,
          lastTranslator : translateOpts.lastTranslator,
          team           : translateOpts.team
      } ))
      .pipe(gulp.dest(translateOpts.destDir + '/' + translateOpts.destFile ))
      .pipe(notify({message: 'TASK: Translation Completed! 💯', onLast: true }));
  }
  exports.translate = gulp.series(translate);

  // - Server Task (Private) - //
  function server(done) {
    if (browserSync) browserSync.init(browserSyncConfig);
    done();
  }

  // - Watch Task - //
  function watch(done) {
    gulp.watch(cssOpts.watch, css); // CSS changes
    gulp.watch(dir.phpSrc, reload); // PHP changes
    gulp.watch(dir.jsVendor, [jsVendor, reload]); // JS Vendor changes
    gulp.watch(dir.jsCustom, [jsCustom, reload]); // JS Custom changes
    done();
  }

  //** Default Tasks **//
  exports.default = gulp.series(exports.css, exports.jsVendor, exports.jsCustom, exports.translate, exports.images, watch, server);

})();
