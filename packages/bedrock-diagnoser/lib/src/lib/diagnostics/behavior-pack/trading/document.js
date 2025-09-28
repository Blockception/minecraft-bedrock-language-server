"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_trading_document = diagnose_trading_document;
const json_1 = require("../../json/json");
const items_1 = require("../../minecraft/items");
const molang_1 = require("../../molang");
const diagnose_1 = require("../item/diagnose");
const functions_1 = require("../loot-table/functions");
/**Diagnoses the given document as an trading table
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_trading_document(diagnoser) {
    var _a;
    const table = json_1.Json.LoadReport(diagnoser);
    if (typeof table !== "object")
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, table);
    //Foreach tier
    (_a = table.tiers) === null || _a === void 0 ? void 0 : _a.forEach((tier) => {
        var _a;
        //Foreach group in tier
        (_a = tier.groups) === null || _a === void 0 ? void 0 : _a.forEach((group) => {
            var _a;
            //Foreach trade in group
            (_a = group.trades) === null || _a === void 0 ? void 0 : _a.forEach((trade) => {
                var _a, _b;
                //Foreach gives in group
                (_a = trade.gives) === null || _a === void 0 ? void 0 : _a.forEach((item) => diagnose_item(item, diagnoser));
                //Foreach want in group
                (_b = trade.wants) === null || _b === void 0 ? void 0 : _b.forEach((item) => diagnose_item(item, diagnoser));
            });
        });
    });
}
function diagnose_item(entry, diagnoser) {
    var _a;
    //Is item then check if item exists
    if (entry.item)
        (0, diagnose_1.behaviorpack_item_diagnose)((0, items_1.minecraft_get_item)(entry.item, diagnoser.document), diagnoser);
    (_a = entry.functions) === null || _a === void 0 ? void 0 : _a.forEach((fn) => (0, functions_1.behaviorpack_loot_table_function_diagnose)(fn, diagnoser));
}
//# sourceMappingURL=document.js.map