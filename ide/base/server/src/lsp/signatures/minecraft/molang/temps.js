"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
/**
 *
 * @param fn
 * @param doc
 */
function provideSignature(fn) {
    TempSignature.activeParameter = fn ? 1 : 0;
    return TempSignature;
}
const TempSignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Temps',
            parameters: [
                { label: 'temp.', documentation: 'The temp to use.' },
                { label: '<temp>', documentation: 'The data to access' },
            ],
        },
    ],
};
//# sourceMappingURL=temps.js.map