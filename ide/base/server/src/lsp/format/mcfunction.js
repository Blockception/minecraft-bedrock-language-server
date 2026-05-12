"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMcfunction = formatMcfunction;
exports.formatMcfunctionRange = formatMcfunctionRange;
const util_1 = require("../../util");
/**
 *
 * @param doc
 * @param params
 * @returns
 */
function formatMcfunction(context, params) {
    const formatter = new MCFunctionFormatter(params, context);
    return formatter.format(context.document, 0, context.document.lineCount);
}
/**
 *
 * @param doc
 * @param params
 * @returns
 */
function formatMcfunctionRange(context, params) {
    const startIndex = params.range.start.line;
    const endIndex = params.range.end.line;
    const formatter = new MCFunctionFormatter(params, context);
    return formatter.format(context.document, startIndex, endIndex);
}
class MCFunctionFormatter {
    options;
    context;
    constructor(params, context) {
        this.options = params.options;
        this.context = context;
    }
    format(document, startIndex, endIndex) {
        const result = [];
        for (let index = startIndex; index < endIndex; index++) {
            if (this.context.token.isCancellationRequested)
                break;
            const line = document.getLine(index);
            if (line.length > 2) {
                (0, util_1.TrimStartFromLine)(line, index, result, ['/', ' ', '\t']);
                (0, util_1.TrimEndFromLine)(line, index, result, [' ', '\t']);
                (0, util_1.Replace)(line, '~+', '~', index, result);
                (0, util_1.Replace)(line, '~0', '~', index, result);
                (0, util_1.Replace)(line, '^+', '^', index, result);
                (0, util_1.Replace)(line, '^0', '^', index, result);
                (0, util_1.Replace)(line, ' ##', ' \t##', index, result);
            }
        }
        return result;
    }
}
//# sourceMappingURL=mcfunction.js.map