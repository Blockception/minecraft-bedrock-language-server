"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_loot_table = check_loot_table;
const diagnose_1 = require("../../loot-table/diagnose");
function check_loot_table(_name, component, _context, diagnoser) {
    if (component === undefined)
        return;
    if (typeof component.table !== "string")
        return;
    const table = component.table;
    (0, diagnose_1.behaviorpack_loot_table_diagnose)(table, diagnoser);
}
//# sourceMappingURL=loot.js.map