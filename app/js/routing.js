define([
    'config',
    'routeHelper'
], function(config,
            routeHelper) {
        'use strict';
        var routing = [
            '$routeProvider',
            function(routeProvider) {
                var routes = config.routes;
                routes.forEach(function(route) {
                    var routeBase = routeHelper.baseOf(route);
                    routeProvider.when(route, {
                        templateUrl: routeHelper.viewFor(routeBase),
                        controller:  routeHelper.controllerFor(routeBase)
                    });
                });
                routeProvider.otherwise({
                    redirectTo: routes[0]
                });
            }];
    return routing;
});
