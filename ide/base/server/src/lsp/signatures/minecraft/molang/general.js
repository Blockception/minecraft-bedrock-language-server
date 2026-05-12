"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignatures = generateSignatures;
exports.generateSignature = generateSignature;
const util_1 = require("../../../../util");
function generateSignatures(scope, cursor, items, parameters, query) {
    return items.filter((item) => item.id === query).map((item) => generateSignature(scope, cursor, item, parameters));
}
function generateSignature(scope, cursor, item, parameters) {
    const out = {
        label: `${scope}.${item.id}`,
        activeParameter: parameters.length,
        documentation: item.documentation ?? `${scope}.${item.id}`,
        parameters: [],
    };
    if (parameters.length > 0) {
        const last = parameters[parameters.length - 1];
        if (util_1.Offset.isAfter(last, cursor)) {
            out.activeParameter = out.activeParameter + 1;
        }
    }
    if (item.parameters) {
        out.label += `(${item.parameters.map((p) => `<${p.id}>`).join(', ')})`;
        out.parameters = item.parameters.map((p) => {
            return { label: p.id, documentation: p.documentation };
        });
    }
    return out;
}
//# sourceMappingURL=general.js.map