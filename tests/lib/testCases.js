/*
 * Example usage:
 *
 * take an it:
 * it("should be awesome", function() {
 *  expect("awesome").toBe("awesome");
 * });
 *
 * and testcase it:
 *
 * testCases("should be", [
 *  ["awesome", awesome"],
 *  ["pink", "pink"],
 *  ["bob", "foo"]      // will fail!
 * ], function(input, expected) {
 *  expect(input).toBe(expected);
 * });
 *
 */
/*global window*/
define([], function() {
    function _first(array, predecate) {
        for (var i = 0; i < array.length; i++) {
            if (predecate(array[i])) {
                return array[i];
            }
        }
        return null;
    }
    function _getDescriptionClause(arg1, arg2, arg3) {
        var args = [arg1, arg2, arg3];
        return first(args, function(item) {
            return (typeof(item) === "string");
        });
    }
    function _getArgumentsClause(arg1, arg2, arg3) {
        var args = [arg1, arg2, arg3];
        return first(args, function(item) {
            return Array.isArray(item);
        });
    }
    function _getFunctionClause(arg1, arg2, arg3) {
        var args = [arg1, arg2, arg3];
        return first(args, function(item) {
            return (typeof(item) === "function");
        });
    }
    function first(obj, predecate) {
        for (var k in obj) {
            var prop = obj[k];
            if (predecate(prop)) {
                return prop;
            }
        }
        return null;
    }
    function getDescriptionClause(args) {
        return first(args, function(item) {
            var type = typeof(item);
            if (type !== "string") {
                return false;
            }
            return (item.toLowerCase() !== "disabled");
        });
    }
    function getArgumentsClause(args) {
        return first(args, function(item) {
            return Array.isArray(item);
        });
    }
    function getFunctionClause(args) {
        return first(args, function(item) {
            return (typeof(item) === "function");
        });
    }
    function getDisabledClause(args) {
        return first(args, function(item) {
            var type = typeof(item);
            if (type !== "string") {
                return false;
            }
            return (item.toLowerCase().indexOf("disabled") === 0);
        });
    }
    function getDisabledDescription(description) {
        var idx = description.toLowerCase().indexOf("disabled");
        if (idx > -1) {
            description = description.replace(/^disabled/i, "");
        }
        return [
            "DISABLED: ",
            description
            ].join("");
    }
    function help() {
        return ["testCases usage: ",
                    "testCases(arg1, arg2, arg3);",
                    "   where you supply, in any order:",
                    "   * a test base description (string)",
                    "   * an array of array of arguments for each test case",
                    "   * a function to call with each iteration",
                    " optionally add an argument 'disabled' to disable a test",
                    "   with console notification (or prepend your description",
                    "   for a test with 'disabled'"].join("\n");
    }
    function testCases() {
        var description = getDescriptionClause(arguments);
        var arrayOfArrayOfArgs = getArgumentsClause(arguments);
        var testFunc = getFunctionClause(arguments);
        var disabled = getDisabledClause(arguments);

        if (!(description && arrayOfArrayOfArgs && testFunc)) {
            throw help();
        }
        if (disabled !== null) {
            window.console.log(getDisabledDescription(description));
            return;
        }


        if (arrayOfArrayOfArgs.length === 0) {
            throw "testCases defined without any test case arguments!";
        }
        for (var i = 0; i < arrayOfArrayOfArgs.length; i++) {
            var theseArgs = arrayOfArrayOfArgs[i];
            var thisDesc = [description, " (", theseArgs.join(","), ")"].join("");
            it(thisDesc, (function(context, args) {
                return function() {
                    testFunc.apply(context, args);
                };
            })(this, theseArgs));
        }
    }
    return testCases;
})
