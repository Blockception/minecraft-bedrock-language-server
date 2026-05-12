"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.animation_controller.missing':
        case 'behaviorpack.animation_controller.missing':
        case 'behaviorpack.anim_or_controller.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create bp animation controller: '${id}'`, ide_shared_1.Commands.Create.Behaviorpack.Animation_Controller, [
                id,
            ]);
            return;
    }
}
//# sourceMappingURL=animation-controllers.js.map