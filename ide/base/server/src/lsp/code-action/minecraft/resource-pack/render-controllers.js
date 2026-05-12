"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'resourcepack.render_controller.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp render_controller: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Render_Controller, [id]);
            return;
    }
}
//# sourceMappingURL=render-controllers.js.map