"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.animation.missing':
        case 'resourcepack.animation.missing':
        case 'resourcepack.anim_or_controller.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp animation: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Animation, [id]);
            return;
    }
}
//# sourceMappingURL=animations.js.map