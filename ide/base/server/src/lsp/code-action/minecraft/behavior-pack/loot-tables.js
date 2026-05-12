"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const ide_shared_1 = require("@blockception/ide-shared");
function onCodeAction(builder, diag) {
    switch (diag.code) {
        case 'minecraft.loot_table.missing':
        case 'behaviorpack.loot_table.missing':
            const id = builder.getId(diag.range);
            builder.command(`Create loot table: '${id}'`, ide_shared_1.Commands.Create.Behaviorpack.Loot_Table, [id]);
            return;
    }
}
//# sourceMappingURL=loot-tables.js.map