"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_filter_has_equipment = diagnose_filter_has_equipment;
const item_1 = require("../../../behavior-pack/item");
function diagnose_filter_has_equipment(filter, diagnoser) {
    const item = filter.value;
    if (!item || typeof item !== "string")
        return;
    (0, item_1.behaviorpack_item_diagnose)(item, diagnoser);
}
//# sourceMappingURL=has_equipment.js.map