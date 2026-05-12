"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.family.missing':
        case 'behaviorpack.family.missing':
            return (0, definition_1.definition)(builder, diag, 'family');
    }
}
//# sourceMappingURL=families.js.map