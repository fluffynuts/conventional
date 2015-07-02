var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = '/base/' + file.replace(/^\/base\/|\.js$/g, '') + '.js';
    allTestFiles.push(normalizedTestModule);
  }
});

var lib = function(relativePath) {
    return '../bower_components/' + relativePath;
};
var testLib = function(relativePath) {
    return '../../tests/lib/' + relativePath;
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app/js',

  // dynamically load all test files
  deps: allTestFiles,
    paths: {
        'angular': lib('angular/angular'),
        'angular-route': lib('angular-route/angular-route'),
        'jquery': lib('jquery/dist/jquery'),
        'randomValueGen': testLib('randomValueGen'),
        'testCases': testLib('testCases')
    },
    map: {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery' : 'jquery' }
    },
    shim: {
        'angular-route': {
            deps: [ 'angular' ]
        },
        'app': {
            deps: [ 'angular', 'angular-route' ]
        }
    },

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
