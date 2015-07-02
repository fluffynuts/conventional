/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var DEBUG = false;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var through = require('through2');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var distBasePath = 'dist';
var distFolderPath = distBasePath + '/www';
var distFolder = function(relPath) {
    if (relPath === undefined || relPath == "") return distFolderPath;
    var joinWith = (relPath[0] == "/") ? "" : "/";
    return [ distFolderPath, relPath].join(joinWith);
};
var platformOutputFolder = function(platform) {
    return [distBasePath, 'platforms', platform].join('/');
};
var androidResFolders = function(target) {
    var resFolder = [platformOutputFolder('android'),
                         'res', 'drawable', 'drawable-'].join('/');
    return [ resFolder + 'land-' + target, resFolder + 'port-' + target ];
};


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('default')));
});


// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    //.pipe($.debug({verbose:DEBUG}))
    //.pipe($.cache($.imagemin({
    //  progressive: true,
    //  interlaced: true
    //})))
    .pipe(gulp.dest(distFolder('images')))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  return gulp.src(['app/*','!app/*.html'], {dot: false})
  //.pipe($.debug({verbose:DEBUG}))
  .pipe(gulp.dest(distFolder()))
  .pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/**'])
  .pipe(gulp.dest(distFolder('fonts')))
    .pipe($.size({title: 'fonts'}));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
      'app/styles/*.scss',
      'app/styles/**/*.css',
      'app/styles/components/components.scss'
    ])
    .pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.if('*.scss', $.rubySass({
      style: 'expanded',
      precision: 10
    })
    .on('error', console.error.bind(console))
    ))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size({title: 'styles'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});
  return gulp.src('app/**/*.html')
    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Update Production Style Guide Paths
    //.pipe($.replace('components/components.css', 'components/main.min.css'))
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output Files
    .on('error', errorHandler)
    .pipe(gulp.dest(distFolder()))
    .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', function() {
    del.bind(null, ['.tmp', distFolder()]);
});

// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });
    
  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: 'dist'
    }

  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', 'jshint', 'html', 'images', 'fonts', 'copy', cb);
});

gulp.task('copy-res', function () {
  return gulp.src(['res/**/*'], {dot: true})
  .pipe(gulp.dest(distFolder("res")))
    .pipe($.size({title: 'copy resources'}));
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://example.com',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}

function errorHandler (error) {
  console.log("ERROR: " + error.toString());
  this.emit('end');
}
