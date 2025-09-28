"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var Text;
(function (Text) {
    function UnQuote(text) {
        if (text.includes(" ") || text.includes('\t'))
            return text;
        if (text.startsWith('"') && text.endsWith('"'))
            return text.slice(1, text.length - 1);
        return text;
    }
    Text.UnQuote = UnQuote;
})(Text || (exports.Text = Text = {}));
//# sourceMappingURL=text.js.map