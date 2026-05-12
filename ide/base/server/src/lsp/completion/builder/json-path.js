"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPathCompletion = exports.JsonPathMatch = void 0;
const path_1 = require("../../../minecraft/json/path");
var JsonPathMatch;
(function (JsonPathMatch) {
    /**
     *
     * @param match
     * @param onCompletion
     * @returns
     */
    function create(match, onCompletion) {
        return {
            match: match,
            onCompletion: onCompletion,
        };
    }
    JsonPathMatch.create = create;
})(JsonPathMatch || (exports.JsonPathMatch = JsonPathMatch = {}));
class JsonPathCompletion {
    _items;
    constructor(...items) {
        this._items = items;
    }
    /**
     * Performs the onCompletion request, checks all of its item match and performs their events if it matches
     * @param context The context to use and pass on
     */
    onCompletion(context) {
        const { isProperty, path } = (0, path_1.getJsonPath)(context.cursor, context.document);
        if (!isProperty) {
            return;
        }
        context.logger.debug(`json path completion: '${path}'`);
        this._items.forEach((item) => {
            switch (typeof item.match) {
                case 'string':
                    if (path.endsWith(item.match)) {
                        item.onCompletion(context);
                    }
                    break;
                case 'function':
                    if (item.match(path)) {
                        item.onCompletion(context);
                    }
                    break;
                default:
                    if (item.match.test(path)) {
                        item.onCompletion(context);
                    }
                    break;
            }
        });
    }
}
exports.JsonPathCompletion = JsonPathCompletion;
//# sourceMappingURL=json-path.js.map