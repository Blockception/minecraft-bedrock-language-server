"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
/**
 *
 * @param fn
 * @param doc
 */
function provideSignature() {
    return GeometrySignature;
}
const GeometrySignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Geometry',
            parameters: [
                { label: 'geometry.', documentation: 'The geometry to use.' },
                { label: '<geometry>', documentation: 'The model to access' },
            ],
        },
    ],
};
//# sourceMappingURL=geometries.js.map