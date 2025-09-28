"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPath = void 0;
/** */
var JsonPath;
(function (JsonPath) {
    JsonPath.seperator = "/";
    /**TODO add documentation
     *
     * @param text
     * @param path
     */
    function resolve(text, path) {
        if (typeof text === "object")
            text = text.getText();
        const s = path.split(/[\\/]/);
        let index = 0;
        for (let I = 0; I < s.length; I++) {
            const elem = s[I];
            if (!Number.isInteger(elem) && elem !== "") {
                const t = text.indexOf(elem, index);
                if (t > -1)
                    index = t;
            }
        }
        return index;
    }
    JsonPath.resolve = resolve;
    /**TODO add documentation
     *
     * @param path
     * @returns
     */
    function create(...path) {
        return path.join(JsonPath.seperator);
    }
    JsonPath.create = create;
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        return typeof value === "string";
    }
    JsonPath.is = is;
})(JsonPath || (exports.JsonPath = JsonPath = {}));
//# sourceMappingURL=json-path.js.map