"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeInTicks = void 0;
/** */
var timeInTicks;
(function (timeInTicks) {
    /**The regex pattern that matches a time value */
    timeInTicks.pattern = /^([-\d]*|[-\d]*[TDS])$/;
    /**Checks if the given text value is a valid time value
     * @param text The valued to check
     * @returns True or false if the text represents an time value*/
    function is(text) {
        return timeInTicks.pattern.test(text);
    }
    timeInTicks.is = is;
    /**Checks if the time is a value specification
     * @param text The valued to check
     * @returns True or false if the time is not a tick spec*/
    function isTick(text) {
        return text.endsWith("T");
    }
    timeInTicks.isTick = isTick;
    /**Checks if the time is a value specification
     * @param text The valued to check
     * @returns True or false if the time is not a second spec*/
    function isSecond(text) {
        return text.endsWith("S");
    }
    timeInTicks.isSecond = isSecond;
    /**Checks if the time is a value specification
     * @param text The valued to check
     * @returns True or false if the time is not a day spec*/
    function isDay(text) {
        return text.endsWith("D");
    }
    timeInTicks.isDay = isDay;
    /**Parses the given time into a number
     * @param text The text to convert*/
    function parse(text) {
        if (isDay(text)) {
            return Number.parseInt(text.slice(0, text.length - 1)) * 24000;
        }
        if (isSecond(text)) {
            return Number.parseInt(text.slice(0, text.length - 1)) * 20;
        }
        if (isTick(text)) {
            return Number.parseInt(text.slice(0, text.length - 1));
        }
        return Number.parseInt(text);
    }
    timeInTicks.parse = parse;
})(timeInTicks || (exports.timeInTicks = timeInTicks = {}));
//# sourceMappingURL=timeInTicks.js.map