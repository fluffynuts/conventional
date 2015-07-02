define([], function() {
    var RouteHelper = function() {
    };
    RouteHelper.prototype = {
        viewFor: function(route) {
            return ['views/', route, '.html'].join('');
        },
        controllerFor: function(route) {
            return [route, 'Controller'].join('');
        },
        baseOf: function(route) {
            var parts = route.replace(/^\//, '').split('/');
            return parts[0];
        }
    };
    return new RouteHelper();
});
