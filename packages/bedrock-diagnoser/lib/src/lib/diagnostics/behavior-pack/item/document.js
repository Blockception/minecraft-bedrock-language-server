"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_item_document = diagnose_item_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const components_1 = require("bc-minecraft-bedrock-types/lib/minecraft/components");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const dependencies_1 = require("./components/dependencies");
const diagnose_1 = require("./components/diagnose");
const duplicate_check_1 = require("../../packs/duplicate-check");
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
const molang_1 = require("../../molang");
/**Diagnoses the given document as an item
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_item_document(diagnoser) {
    var _a, _b, _c, _d;
    const item = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Item.is(item))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, item);
    const identifier = item["minecraft:item"].description.identifier;
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)("behaviorpack.block", diagnoser.context.getProjectData().projectData.behaviorPacks.items, identifier, diagnoser);
    //Check components
    const context = {
        source: item,
        components: (0, components_1.getUsedComponents)(item["minecraft:item"]),
    };
    if (!((_a = item["minecraft:item"]["components"]) === null || _a === void 0 ? void 0 : _a["minecraft:icon"]) &&
        !((_c = (_b = item["minecraft:item"]["components"]) === null || _b === void 0 ? void 0 : _b["minecraft:block_placer"]) === null || _c === void 0 ? void 0 : _c.replace_block_item))
        diagnoser.add("components", "`minecraft:icon` or `minecraft:block_placer`.`replace_block_item` == `true`) is required.", types_1.DiagnosticSeverity.error, "behaviorpack.item.components.icon");
    (0, diagnose_1.behaviorpack_diagnose_item_components)(item["minecraft:item"], context, diagnoser);
    (0, dependencies_1.behaviorpack_item_components_dependencies)(item, context, diagnoser);
    if (item["minecraft:item"]["events"])
        diagnoser.add(`events`, `Item events have been deprecated in favour of \`minecraft:custom_components\`.`, types_1.DiagnosticSeverity.error, "behaviorpack.item.deprecated");
    const group = (_d = item["minecraft:item"].description.menu_category) === null || _d === void 0 ? void 0 : _d.group;
    if (typeof group != "string")
        return;
    //TODO: Check if group name is valid
    try {
        const parsedVersion = minecraft_1.FormatVersion.parse(context.source.format_version);
        const greaterThan = minecraft_1.FormatVersion.isGreaterThan(parsedVersion, [1, 21, 50]);
        if (greaterThan && group.startsWith("itemGroup"))
            diagnoser.add(group, `Item groups must be namespaced in versions > 1.21.50`, types_1.DiagnosticSeverity.warning, "behaviorpack.item.namespace_group");
        if (!greaterThan && group.includes(":"))
            diagnoser.add(group, `Item groups cannot be namespaced in versions <= 1.21.50`, types_1.DiagnosticSeverity.warning, "behaviorpack.item.namespace_group");
        if (minecraft_1.FormatVersion.isLessThan(parsedVersion, [1, 21, 90]) &&
            context.components.some((name) => !name.startsWith("minecraft:")))
            diagnoser.add("format_version", `To use custom components, a format version <= 1.21.90 is required`, types_1.DiagnosticSeverity.warning, "behaviorpack.item.custom_component_v2.min_version");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        // Leaving empty as the base diagnoser should flag an invalid format version
    }
}
//# sourceMappingURL=document.js.map