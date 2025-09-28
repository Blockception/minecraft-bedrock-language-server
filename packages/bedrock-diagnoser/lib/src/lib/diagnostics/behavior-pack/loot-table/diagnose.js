"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_loot_table_diagnose = behaviorpack_loot_table_diagnose;
exports.behaviorpack_loot_table_short_diagnose = behaviorpack_loot_table_short_diagnose;
const types_1 = require("../../../types");
const __1 = require("../..");
function behaviorpack_loot_table_diagnose(value, diagnoser) {
    const id = typeof value === "string" ? value : value.text;
    if (has_loot_table(id, diagnoser)) {
        return true;
    }
    return false;
}
function behaviorpack_loot_table_short_diagnose(value, diagnoser) {
    let id = typeof value === "string" ? value : value.text;
    //Strip ""
    if (id.startsWith('"')) {
        id = id.slice(1);
    }
    if (id.endsWith('"')) {
        id = id.slice(0, -1);
    }
    if (!id.startsWith("loot_tables/")) {
        id = "loot_tables/" + id;
    }
    if (!id.endsWith(".json")) {
        id = id + ".json";
    }
    if (has_loot_table(id, diagnoser)) {
        return true;
    }
    diagnoser.add(value, `Cannot find behaviorpack loot_table definition: ${id}`, types_1.DiagnosticSeverity.error, "behaviorpack.loot_table.missing");
    return false;
}
function has_loot_table(id, diagnoser) {
    //Project has loot table
    const table = diagnoser.context.getProjectData().behaviors.loot_tables.get(id, diagnoser.project);
    if (table === undefined) {
        __1.Errors.missing("behaviors", "loot_tables", id, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map