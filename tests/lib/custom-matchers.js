beforeEach(function() {
    var fail = function(msg) {
        return {
            pass: false,
            message: msg
        };
    };
    var pass = function() {
        return {
            pass: true
        };
    };
    jasmine.addMatchers({
        toBeFunction: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    if (actual === undefined) {
                        return fail('expected a Function but got undefined');
                    }
                    if (typeof actual !== typeof function() {}) {
                        return fail('expected a function but got: ' + actual);
                    }
                    return pass();
                }
            };
        },
        toBeLessThanOrEqualTo: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    if (actual === undefined) {
                        return fail('expected a number but got undefined');
                    }
                    if (typeof actual !== typeof 1) {
                        return fail('expected a number but got: ' + actual);
                    }
                    if (actual > expected) {
                        return fail('expected a number <= ' + expected + ' but got: ' + actual);
                    }
                    return pass();
                }
            };
        },
        toBeGreaterThanOrEqualTo: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    if (actual === undefined) {
                        return fail('expected a number but got undefined');
                    }
                    if (typeof actual !== typeof 1) {
                        return fail('expected a number but got: ' + actual);
                    }
                    if (actual < expected) {
                        return fail('expected a number >= ' + expected + ' but got: ' + actual);
                    }
                    return pass();
                }
            };
        }
    });
});
