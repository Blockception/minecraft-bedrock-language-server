"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
/**
 *
 * @param fn
 * @param doc
 */
function provideSignature() {
    return MaterialSignature;
}
const MaterialSignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Material',
            parameters: [
                { label: 'material.', documentation: 'The material to use.' },
                { label: '<material>', documentation: 'The model to access' },
            ],
        },
    ],
};
//# sourceMappingURL=materials.js.map