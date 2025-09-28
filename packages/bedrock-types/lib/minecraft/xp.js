"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XP = void 0;
/** */
var XP;
(function (XP) {
    /**The regex pattern that matches a XP value */
    XP.pattern = /^([-\d]*|[-\d]*[Ll])$/;
    /**Checks if the given text value is a valid xp value
     * @param text The valued to check
     * @returns True or false if the text represents an xp value*/
    function is(text) {
        return XP.pattern.test(text);
    }
    XP.is = is;
    /**Checks if the XP is a value specification
     * @param text The valued to check
     * @returns True or false if the xp is not a level spec*/
    function isLevel(text) {
        return text.endsWith("l") || text.endsWith("L");
    }
    XP.isLevel = isLevel;
    /**Parses the given xp into a number
     * @param text The text to convert*/
    function parse(text) {
        if (isLevel(text)) {
            text = text.slice(0, text.length - 1);
        }
        return Number.parseInt(text);
    }
    XP.parse = parse;
})(XP || (exports.XP = XP = {}));
//# sourceMappingURL=xp.js.map