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
    if (!fn) {
        return QuerySignature;
    }
    return {
        activeParameter: 1,
        activeSignature: 0,
        signatures: (0, general_1.generateSignatures)('query', cursor, bc_minecraft_molang_1.MolangData.General.Queries, parameters, fn),
    };
}
const QuerySignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Query',
            parameters: [
                { label: 'query.', documentation: 'The query to use.' },
                { label: '<query>', documentation: 'The function' },
            ],
        },
    ],
};
//# sourceMappingURL=queries.js.map