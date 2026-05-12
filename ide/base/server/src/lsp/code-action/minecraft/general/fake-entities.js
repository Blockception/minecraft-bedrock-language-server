"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.fakeentity.missing':
            return (0, definition_1.definition)(builder, diag, 'fakeentity');
    }
}
//# sourceMappingURL=fake-entities.js.map