"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_block_document = diagnose_block_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
const components_1 = require("bc-minecraft-bedrock-types/lib/minecraft/components");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const molang_1 = require("../../molang");
const duplicate_check_1 = require("../../packs/duplicate-check");
const dependencies_1 = require("./components/dependencies");
const diagnose_1 = require("./components/diagnose");
/**Diagnoses the given document as an bp block
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_block_document(diagnoser) {
    var _a, _b, _c;
    const block = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Block.is(block))
        return;
    const identifier = block["minecraft:block"].description.identifier;
    const context = {
        source: block,
        components: (0, components_1.getUsedComponents)(block["minecraft:block"]),
    };
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, block);
    (0, diagnose_1.behaviorpack_diagnose_block_components)(block["minecraft:block"], context, diagnoser);
    (0, dependencies_1.behaviorpack_block_components_dependencies)(block, context, diagnoser);
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)("behaviorpack.block", diagnoser.context.getProjectData().projectData.behaviorPacks.blocks, identifier, diagnoser);
    //check components
    (_b = (_a = block["minecraft:block"]) === null || _a === void 0 ? void 0 : _a.permutations) === null || _b === void 0 ? void 0 : _b.forEach((p) => {
        context.components.push(...(0, components_1.getUsedComponents)(p));
        (0, diagnose_1.behaviorpack_diagnose_block_components)(p, context, diagnoser);
    });
    if (block["minecraft:block"]["events"]) {
        diagnoser.add(`events`, `Block events have been deprecated in favour of \`minecraft:custom_components\`.`, types_1.DiagnosticSeverity.error, "behaviorpack.block.deprecated");
    }
    const group = (_c = block["minecraft:block"].description.menu_category) === null || _c === void 0 ? void 0 : _c.group;
    if (typeof group != "string")
        return;
    //TODO: Check if group name is valid
    try {
        const greaterThan = minecraft_1.FormatVersion.isGreaterThan(context.source.format_version, [1, 21, 50]);
        if (greaterThan && group.startsWith("itemGroup")) {
            diagnoser.add(group, `Item groups must be namespaced in versions > 1.21.50`, types_1.DiagnosticSeverity.warning, "behaviorpack.block.namespace_group");
        }
        if (!greaterThan && group.includes(":")) {
            diagnoser.add(group, `Item groups cannot be namespaced in versions <= 1.21.50`, types_1.DiagnosticSeverity.warning, "behaviorpack.block.namespace_group");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        // Leaving empty as the base diagnoser should flag an invalid format version
    }
}
//# sourceMappingURL=document.js.map