"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const general_1 = require("./general");
/**
 *
 * @param fn
 * @param doc
 */
function provideSignature(fn, cursor, parameters) {
    if (!fn)
        return MathSignature;
    return {
        activeParameter: 1,
        activeSignature: 0,
        signatures: (0, general_1.generateSignatures)('math', cursor, bc_minecraft_molang_1.MolangData.General.Math, parameters, fn),
    };
}
const MathSignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Math',
            parameters: [
                { label: 'math.', documentation: 'The math to use.' },
                { label: '<math fn>', documentation: 'The function' },
            ],
        },
    ],
};
//# sourceMappingURL=math.js.map