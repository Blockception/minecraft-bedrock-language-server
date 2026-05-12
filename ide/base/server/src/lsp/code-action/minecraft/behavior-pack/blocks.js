"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.block.missing':
        case 'behaviorpack.block.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create bp block: '${id}'`, ide_shared_1.Commands.Create.Behaviorpack.Block, [id]);
            return;
    }
}
//# sourceMappingURL=blocks.js.map