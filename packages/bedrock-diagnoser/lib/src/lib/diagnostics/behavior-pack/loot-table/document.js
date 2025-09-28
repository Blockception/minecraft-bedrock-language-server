"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_loot_table_document = diagnose_loot_table_document;
const json_1 = require("../../json/json");
const items_1 = require("../../minecraft/items");
const molang_1 = require("../../molang");
const diagnose_1 = require("../item/diagnose");
const diagnose_2 = require("./diagnose");
const functions_1 = require("./functions");
/**Diagnoses the given document as an loot table
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_loot_table_document(diagnoser) {
    var _a;
    const table = json_1.Json.LoadReport(diagnoser);
    if (typeof table !== "object")
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, table);
    (_a = table.pools) === null || _a === void 0 ? void 0 : _a.forEach((pool) => {
        var _a;
        (_a = pool.entries) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            var _a;
            //Is item then check if item exists
            switch (entry.type) {
                case "item":
                    if (entry.name)
                        (0, diagnose_1.behaviorpack_item_diagnose)((0, items_1.minecraft_get_item)(entry.name, diagnoser.document), diagnoser);
                    break;
                case "loot_table":
                    if (entry.name)
                        (0, diagnose_2.behaviorpack_loot_table_diagnose)((0, items_1.minecraft_get_item)(entry.name, diagnoser.document), diagnoser);
                    break;
            }
            //Loop over functions
            (_a = entry.functions) === null || _a === void 0 ? void 0 : _a.forEach((fn) => (0, functions_1.behaviorpack_loot_table_function_diagnose)(fn, diagnoser));
        });
    });
}
//# sourceMappingURL=document.js.map