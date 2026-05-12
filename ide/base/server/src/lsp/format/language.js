"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLangauge = formatLangauge;
exports.formatLangaugeRange = formatLangaugeRange;
const util_1 = require("../../util");
const progress_1 = require("../progress");
function formatLangauge(context, params) {
    const formatter = new LanguageFormatter(params, context);
    return formatter.format(context.document, 0, context.document.lineCount);
}
function formatLangaugeRange(context, params) {
    const formatter = new LanguageFormatter(params, context);
    const startLine = params.range.start.line;
    const endLine = params.range.end.line;
    return formatter.format(context.document, startLine, endLine);
}
class LanguageFormatter {
    options;
    context;
    constructor(params, context) {
        this.options = params.options;
        this.context = context;
    }
    format(document, startLine, endLine) {
        const reporter = new progress_1.ProgressBar(this.context.workDoneProgress, `formatting: ${document.filename()}`);
        this.context.logger.info(`formatting document`);
        const result = [];
        for (let index = startLine; index < endLine; index++) {
            if (this.context.token.isCancellationRequested)
                break;
            const line = document.getLine(index);
            (0, util_1.TrimStartFromLine)(line, index, result, [' ', '\t']);
            if (this.options.trimTrailingWhitespace) {
                //TODO: check if line doesn't end with \r\n or \n
                (0, util_1.TrimEndFromLine)(line, index, result, [' ', '\t']);
            }
            //TODO: this.options.insertFinalNewline
            //TODO: this.options.trimFinalNewlines
        }
        reporter.done();
        reporter.sendProgress();
        return result;
    }
}
//# sourceMappingURL=language.js.map