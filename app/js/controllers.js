define([
    'config'
], function(config) {
    var controllers = config.routes.map(function(route) {
        return 'controllers/' + route;
    });
    require(controllers, function() {

    });
});
