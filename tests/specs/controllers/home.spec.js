define([
    'controllers/home',
    'testCases',
    'randomValueGen'
], function(homeController,
            testCases,
            randomValueGen) {
    // example on how to start testing controllers
    describe('controllers/home', function() {
        it('should return the home controller configuration', function() {
            expect(homeController).toBeDefined();
        });
        it('should expect $scope as the first requirement', function() {
            expect(homeController[0]).toEqual('$scope');
        });
        it('should provide the controller function', function() {
            var fn = homeController[homeController.length-1];
            expect(fn).toBeDefined();
            expect(fn).toBeFunction();
        });
    });

    // example on how to use testCases and randomValueGen
    testCases('should produce random numbers within a provided range', [
        [ 10, 20],
        [ 100, 200]
    ], function(randomRangeMinimum, randomRangeMaximum) {
        var randomNumber = randomValueGen.getRandomInt(randomRangeMinimum, randomRangeMaximum);
        expect(randomNumber).toBeLessThanOrEqualTo(randomRangeMaximum);
        // is equivalent to
        expect(randomNumber).not.toBeGreaterThan(randomRangeMaximum);

        expect(randomNumber).toBeGreaterThanOrEqualTo(randomRangeMinimum);
        // is equivalent to
        expect(randomNumber).not.toBeLessThan(randomRangeMinimum);
    });
});
