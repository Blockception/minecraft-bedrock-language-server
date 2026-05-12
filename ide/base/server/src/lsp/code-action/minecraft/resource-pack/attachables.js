"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.attachable.missing':
        case 'resourcepack.attachable.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp attachable: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Attachable, [id]);
            return (0, definition_1.definition)(builder, diag, 'attachable');
    }
}
//# sourceMappingURL=attachables.js.map