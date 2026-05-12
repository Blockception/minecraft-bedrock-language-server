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
                label: 'Texture',
                parameters: [
                    { label: 'texture.', documentation: 'The texture to use.' },
                    { label: '<texture>', documentation: 'The texture to access' },
                ],
            },
        ],
    };
}
//# sourceMappingURL=textures.js.map