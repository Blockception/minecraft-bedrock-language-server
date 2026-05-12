"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.animation.missing':
        case 'behaviorpack.animation.missing':
        case 'behaviorpack.anim_or_controller.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create bp animation: '${id}'`, ide_shared_1.Commands.Create.Behaviorpack.Animation, [id]);
            return;
    }
}
//# sourceMappingURL=animations.js.map