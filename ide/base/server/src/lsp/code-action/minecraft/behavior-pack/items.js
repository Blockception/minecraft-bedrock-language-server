"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.item.missing':
        case 'behaviorpack.item.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create bp item: '${id}'`, ide_shared_1.Commands.Create.Behaviorpack.Item, [id]);
            return;
    }
}
//# sourceMappingURL=items.js.map