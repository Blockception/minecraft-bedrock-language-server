"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const command_execute_1 = require("./command-execute");
/**
 *
 * @param builder
 * @param diag
 */
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.commands.execute.deprecated':
            return (0, command_execute_1.codeaction_execute_deprecated)(builder, diag);
    }
}
//# sourceMappingURL=commands.js.map