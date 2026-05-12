"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideHover = provideHover;
function provideHover(range) {
    return {
        contents: {
            kind: 'markdown',
            value: 'The raw text component',
        },
        range: range,
    };
}
//# sourceMappingURL=json-raw-text.js.map