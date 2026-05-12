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
    const table = json_1.Json.LoadReport(diagnoser);
    if (typeof table !== 'object')
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, table);
    //Foreach tier
    table.tiers?.forEach((tier) => {
        //Foreach group in tier
        tier.groups?.forEach((group) => {
            //Foreach trade in group
            group.trades?.forEach((trade) => {
                //Foreach gives in group
                trade.gives?.forEach((item) => diagnose_item(item, diagnoser));
                //Foreach want in group
                trade.wants?.forEach((item) => diagnose_item(item, diagnoser));
            });
        });
    });
}
function diagnose_item(entry, diagnoser) {
    //Is item then check if item exists
    if (entry.item)
        (0, diagnose_1.behaviorpack_item_diagnose)((0, items_1.minecraft_get_item)(entry.item, diagnoser.document), diagnoser);
    entry.functions?.forEach((fn) => (0, functions_1.behaviorpack_loot_table_function_diagnose)(fn, diagnoser));
}
//# sourceMappingURL=document.js.map