"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_loot_table_function_diagnose = behaviorpack_loot_table_function_diagnose;
const diagnose_1 = require("../entity/diagnose");
/**
 *
 * @param value
 * @param diagnoser
 */
function behaviorpack_loot_table_function_diagnose(value, diagnoser) {
    switch (value.function) {
        case "set_actor_id":
            const entityid = value.id;
            if (typeof entityid === "string")
                (0, diagnose_1.behaviorpack_entityid_diagnose)(entityid, diagnoser);
            break;
    }
}
//# sourceMappingURL=functions.js.map