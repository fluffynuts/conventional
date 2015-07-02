define([
    'controllers/edit',
    'testCases',
    'randomValueGen'
], function(editController,
            testCases,
            randomValueGen) {
    // example on how to start testing controllers
    describe('controllers/edit', function() {
        it('should return the edit controller configuration', function() {
            expect(editController).toBeDefined();
        });
        it('should expect $scope as the first requirement', function() {
            expect(editController[0]).toEqual('$scope');
        });
        it('should expect $routeParams as the second requirement', function() {
            expect(editController[1]).toEqual('$routeParams');
        });
        it('should provide the controller function', function() {
            var fn = editController[editController.length-1];
            expect(fn).toBeDefined();
            expect(fn).toBeFunction();
        });
        describe('controller function', function() {
            var create = function(withRouteParams, onScope) {
                var fn = editController[editController.length-1];
                onScope = onScope || {};
                fn(onScope, withRouteParams || {});
                return onScope;
            };
            it('should set the scope id field from the route parameters', function() {
                var params = { 
                    id: randomValueGen.getRandomInt(10, 20) 
                };
                var sut = create(params);
                expect(sut.id).toBeDefined();
                expect(sut.id).toEqual(params.id);
            });
        });
    });
});
