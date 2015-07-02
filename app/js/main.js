(function() {
    var lib = function(relativePath) {
        return '../bower_components/' + relativePath;
    };
    requirejs.config({
        baseUrl: 'js',
        paths: {
            'angular': lib('angular/angular'),
            'angular-route': lib('angular-route/angular-route'),
            'jquery': lib('jquery/dist/jquery'),
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
        }
    });

    require(['app'], function() {
    });
})();
