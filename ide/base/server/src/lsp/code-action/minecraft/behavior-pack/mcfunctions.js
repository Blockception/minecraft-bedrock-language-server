"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.mcfunction.missing':
        case 'behaviorpack.mcfunction.missing':
        case 'behaviorpack.functions.missing':
            return (0, definition_1.definition)(builder, diag, 'function');
    }
}
//# sourceMappingURL=mcfunctions.js.map