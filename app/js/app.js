define([
    'jquery',
    'routing',
    'routeHelper',
    'config'
], function($, 
            routing, 
            routeHelper,
            config) {
    'use strict';
    var app = angular.module('angularApp', ['ngRoute']);
    app.config(routing);

    // TODO: controller magick
    var controllerConfig = config.routes.map(function(route) {
        var routeBase = routeHelper.baseOf(route);
        return {
            url: 'controllers/' + routeBase,
            name: routeBase + 'Controller'
        }
    });
    var controllerScripts = controllerConfig.map(function(item) {
        return item.url;
    });
    require(controllerScripts, function() {
        var arg = 0;
        var controllers = arguments;
        controllerConfig.forEach(function(item) {
            app.controller(item.name, controllers[arg++]);
        });
        angular.bootstrap($('#content'), ['angularApp']);
    });


//    define([
//            'jquery',
//            'routing',
//            'controllers/home'
//                ], function(
//                    $,
//                    routing,
//                    defaultController
//                ) {
//                    'use strict';
//                    var app = angular.module('angularApp', ['ngRoute']);
//                    app.config(routing);
//                    app.controller('defaultController', defaultController);
//
//                    angular.bootstrap($('#content'), ['angularApp']);
//    });
});
