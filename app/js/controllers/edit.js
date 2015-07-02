define(['jquery'],
    function($) {
        return [
            '$scope',
            '$routeParams',
            function(self, routeParams) {
                self.id = routeParams.id
            }
        ];
});
