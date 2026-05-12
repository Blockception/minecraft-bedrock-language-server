"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.block.missing':
        case 'resourcepack.block.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp block: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Blocks, [id]);
            return (0, definition_1.definition)(builder, diag, 'block');
    }
}
//# sourceMappingURL=blocks.js.map