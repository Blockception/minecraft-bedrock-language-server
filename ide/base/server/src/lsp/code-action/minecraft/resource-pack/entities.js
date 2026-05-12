"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.entity.missing':
        case 'resourcepack.entity.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp & bp entity: '${id}'`, ide_shared_1.Commands.Create.General.Entity, [id]);
            builder.command(`Create rp entity: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Entity, [id]);
            return (0, definition_1.definition)(builder, diag, 'entity');
    }
}
//# sourceMappingURL=entities.js.map