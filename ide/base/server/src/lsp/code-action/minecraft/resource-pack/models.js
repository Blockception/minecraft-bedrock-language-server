"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'resourcepack.model.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create rp model: '${id}'`, ide_shared_1.Commands.Create.Resourcepack.Model, [id]);
            return;
    }
}
//# sourceMappingURL=models.js.map