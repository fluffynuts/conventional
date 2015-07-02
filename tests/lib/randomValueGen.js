define([], function() {
    "use strict";
    var self = {};
    self.getRandomInt = function(min, max, butNot) {
        var result;
        if (min === undefined)
            min = 0;
        if (max === undefined)
            max = min + 32768;
        if (butNot === undefined) {
            butNot = [];
        } else if (!Array.isArray(butNot)) {
            butNot = [butNot];
        }
        for (var i = 0; i < 10000; i++) {
            result = parseInt(Math.round(min + (Math.random() * (max - min))), 10);
            if (butNot.indexOf(result) === -1) {
                return result;
            }
        }
        throw ["Unable to get random int !== '", butNot, "'"].join("");
    };
    var randomStringSrcChars = "ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz123567890"; //-_=+!@#$%^&*()[]}{|:;'<>,.?/\"\\";
    self.getRandomString = function(minLength, maxLength, characterSet) {
        if (minLength == undefined)
            minLength = 0;
        if (minLength < 0)
            minLength = 0;
        if (typeof(maxLength) === "string") {
            characterSet = maxLength;
            maxLength = undefined;
        }
        if (maxLength == undefined)
            maxLength = minLength + 10;
        if (maxLength < minLength) {
            var swap = minLength;
            minLength = maxLength;
            maxLength = swap;
        }
        var actualLength = self.getRandomInt(minLength, maxLength);
        var chars = [];
        characterSet = characterSet || randomStringSrcChars;
        var maxIndex = characterSet.length - 1;
        for (var i = 0; i < actualLength; i++) {
            var pos = self.getRandomInt(0, maxIndex);
            chars.push(characterSet[pos]);
        }
        return chars.join("");
    };
    self.getRandomStringNotIn = function(notThese, minLength, maxLength) {
        var result = null;
        do {
            result = self.getRandomString(minLength, maxLength);
        } while (notThese.indexOf(result) > -1)
        return result;
    };
    self.randomFrom = function(possibles, butNot) {
        if (possibles.length === 0) {
            return undefined;
        }
        if (possibles.length === 1) {
            return possibles[0];
        }
        var idx = self.getRandomInt(0, possibles.length - 1);
        var candidate = possibles[idx];
        if (undefined !== butNot && candidate === butNot) {
            return self.randomFrom(possibles, butNot);
        }
        return candidate;
    };
    self.valueOrRandomFrom = function(val, possibles, butNot) {
        if (val === undefined) {
            return self.randomFrom(possibles, butNot);
        }
        return val;
    };
    self.getRandomBool = function() {
        return !!self.getRandomInt(0, 1);
    };
    self.getRandomStringArray = function(minElements, maxElements, minLength, maxLength) {
        minElements = minElements || 1;
        maxElements = maxElements || 5;
        minLength = minLength || 1;
        maxLength = maxLength || 32;
        var actualElements = self.getRandomInt(minElements, maxElements);
        var result = [];
        for (var i = 0; i < actualElements; i++) {
            result.push(self.getRandomString(minLength, maxLength));
        }
        return result;
    };
    self.getRandomDate = function(minDate, maxDate) {
        minDate = minDate || new Date(1980, 0, 1);
        maxDate = maxDate || new Date(2050, 11, 31);
        var actualSeconds = self.getRandomInt(minDate.getTime(), maxDate.getTime());
        var date = new Date();
        date.setTime(actualSeconds);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };
    self.getRandomDate1 = function() {
        var year = self.getRandomInt(1980, 2050);
        var month = self.getRandomInt(1, 12);
        var day = self.getRandomInt(1, month === 2 ? 28 : 
            [4,6,9,11].indexOf(month) === -1 ? 31 : 30);
        return new Date(year, month, day);
    };
    self.getRandomDateTime = function() {
        var date = self.getRandomDate();
        var hour = self.getRandomInt(0, 23);
        var min = self.getRandomInt(0, 59);
        var sec = self.getRandomInt(0, 59);
        var msec = self.getRandomInt(0, 999);
        date.setHours(hour);
        date.setMinutes(min);
        date.setSeconds(sec);
        date.setMilliseconds(msec);
        return date;
    };
    return self;
});
