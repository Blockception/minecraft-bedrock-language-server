"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.mcstructure.missing':
        case 'behaviorpack.mcstructure.missing':
            return (0, definition_1.definition)(builder, diag, 'structure');
    }
}
//# sourceMappingURL=structures.js.map