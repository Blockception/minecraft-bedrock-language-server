"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
/**
 *
 * @param fn
 * @param doc
 */
function provideSignature(fn) {
    return {
        activeParameter: fn ? 1 : 0,
        activeSignature: 0,
        signatures: [
            {
                label: 'Variable',
                parameters: [
                    { label: 'variable.', documentation: 'The variable to use.' },
                    { label: '<variable>', documentation: 'The variable to access' },
                ],
            },
        ],
    };
}
//# sourceMappingURL=variables.js.map