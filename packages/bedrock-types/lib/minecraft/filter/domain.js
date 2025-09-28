"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainType = void 0;
var DomainType;
(function (DomainType) {
    /**
     * Tries to convert the given text to a DomainType
     * @param text The text to convert
     * @returns The DomainType or undefined
     */
    function parse(text) {
        switch (text) {
            case "any":
            case "armor":
            case "feet":
            case "hand":
            case "head":
            case "leg":
            case "torso":
                return text;
            default:
                return "any";
        }
    }
    DomainType.parse = parse;
})(DomainType || (exports.DomainType = DomainType = {}));
//# sourceMappingURL=domain.js.map