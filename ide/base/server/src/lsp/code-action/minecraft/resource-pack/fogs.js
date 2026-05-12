"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
const definition_1 = require("../../types/definition");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.fog.missing':
        case 'resourcepack.fog.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp fog: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Fog, [id]);
            return (0, definition_1.definition)(builder, diag, 'fog');
    }
}
//# sourceMappingURL=fogs.js.map