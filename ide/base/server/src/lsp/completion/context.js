"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCompletionContext = exports.CommandCompletionContext = void 0;
/**
 *
 */
var CommandCompletionContext;
(function (CommandCompletionContext) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value) {
            const temp = value;
            if (temp.parameter && temp.command && temp.cursor && temp.builder)
                return true;
        }
        return false;
    }
    CommandCompletionContext.is = is;
})(CommandCompletionContext || (exports.CommandCompletionContext = CommandCompletionContext = {}));
var JsonCompletionContext;
(function (JsonCompletionContext) {
    function getProperty(context) {
        const text = context.document.getText();
        const before = text.slice(0, context.range.start);
        const index = before.lastIndexOf('":');
        if (index === -1)
            return undefined;
        //Find the start of the property
        const start = before.lastIndexOf('"', index - 1);
        if (start === -1)
            return undefined;
        return before.slice(start + 1, index);
    }
    JsonCompletionContext.getProperty = getProperty;
})(JsonCompletionContext || (exports.JsonCompletionContext = JsonCompletionContext = {}));
//# sourceMappingURL=context.js.map