"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_item_catalog_document = diagnose_item_catalog_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
const diagnose_1 = require("../item/diagnose");
const molang_1 = require("../../molang");
/**Diagnoses the given document as an item catalog
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_item_catalog_document(diagnoser) {
    const catalog = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.ItemCatalog.is(catalog))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, catalog);
    catalog["minecraft:crafting_items_catalog"].categories.forEach((category) => {
        category.groups.forEach((group) => {
            var _a;
            const icon = (_a = group.group_identifier) === null || _a === void 0 ? void 0 : _a.icon;
            if (typeof icon == "string")
                (0, diagnose_1.behaviorpack_item_diagnose)(icon, diagnoser);
            group.items.forEach((entry) => {
                if (typeof entry == "string")
                    (0, diagnose_1.behaviorpack_item_diagnose)(entry, diagnoser);
                else
                    (0, diagnose_1.behaviorpack_item_diagnose)(entry.name, diagnoser);
            });
        });
    });
}
//# sourceMappingURL=document.js.map