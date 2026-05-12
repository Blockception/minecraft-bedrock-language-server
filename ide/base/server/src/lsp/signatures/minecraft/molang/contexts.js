"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
/**
 *
 * @param fn
 * @param doc
 */
function provideSignature(fn) {
    ContextSignature.activeParameter = fn ? 1 : 0;
    return ContextSignature;
}
const ContextSignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Contexts',
            parameters: [
                { label: 'context.', documentation: 'The context to use.' },
                { label: '<context>', documentation: 'The data to access' },
            ],
        },
    ],
};
//# sourceMappingURL=contexts.js.map