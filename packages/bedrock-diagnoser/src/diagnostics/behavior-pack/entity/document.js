"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_entity_document = diagnose_entity_document;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const molang_1 = require("bc-minecraft-bedrock-project/src/project/molang");
const components_1 = require("bc-minecraft-bedrock-types/src/minecraft/components");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const script_1 = require("../../minecraft/script");
const molang_2 = require("../../molang");
const duplicate_check_1 = require("../../packs/duplicate-check");
const anim_or_controller_1 = require("../anim-or-controller");
const usage_1 = require("../animation/usage");
const components_2 = require("./components");
const dependencies_1 = require("./components/dependencies");
const events_1 = require("./events");
const properties_1 = require("./properties");
/**Diagnoses the given document as an bp entity
 * @param doc The text document to diagnose
 * @param diag The diagnoser builder to receive the errors*/
function diagnose_entity_document(diag) {
    const diagnoser = types_1.Metadata.withMetadata(diag, { userType: 'Entities' });
    const entity = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Entity.is(entity))
        return;
    const container = entity['minecraft:entity'];
    const identifier = container.description.identifier;
    const molangData = (0, molang_1.harvestMolang)(diagnoser.document.getText(), container);
    //check components
    const context = {
        source: entity,
        components: (0, components_1.getUsedComponents)(entity['minecraft:entity']),
    };
    (0, molang_2.diagnose_molang_syntax_current_document)(diagnoser, entity);
    (0, dependencies_1.behaviorpack_entity_components_dependencies)(entity, context, diagnoser);
    (0, components_2.behaviorpack_entity_components_check)(entity, context, diagnoser);
    //No resource-pack check, entities can exist without their rp side
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)('behaviorpack.entity', diagnoser.context.getProjectData().projectData.behaviorPacks.entities, identifier, diagnoser);
    const owner = {
        id: identifier,
        molang: molangData,
        animations: bc_minecraft_bedrock_project_1.References.create(),
    };
    const properties = Object.entries(container.description.properties ?? {}).map(([name, value]) => propertyToProjectProperty(name, value));
    //Convert animations / controllers
    bc_minecraft_bedrock_shared_1.Definition.forEach(container.description.animations, (ref, anim_id) => {
        owner.animations.defined.add(ref);
        owner.animations.using.add(anim_id);
    });
    //Check animations / animation controllers implements
    owner.animations.using.forEach((anim_id) => (0, anim_or_controller_1.diagnose_animation_or_controller_implementation)(anim_id, owner, diagnoser));
    if ('permutations' in container)
        diagnoser.add(`permutations`, `Entity permutations have been deprecated.`, types_1.DiagnosticSeverity.error, 'behaviorpack.entity.permutations');
    if ('aliases' in container.description)
        diagnoser.add(`aliases`, `Entity aliases have been deprecated.`, types_1.DiagnosticSeverity.error, 'behaviorpack.entity.aliases');
    //Script check
    if (container.description.scripts) {
        (0, script_1.diagnose_script)(diagnoser, container.description.scripts, container.description.animations);
    }
    //Check used animations
    const anim_data = {
        animationControllers: {},
        animations: container.description.animations ?? {},
        script: container.description.scripts ?? {},
    };
    (0, usage_1.behaviorpack_animation_used)(anim_data, diagnoser);
    (0, properties_1.diagnose_entity_properties_definition)(properties, diagnoser, diagnoser.document.getText());
    //Check events
    if (container.events) {
        (0, events_1.behaviorpack_entity_check_events)(container.events, diagnoser, properties, container.component_groups);
    }
}
function propertyToProjectProperty(name, value) {
    switch (value.type) {
        case 'bool':
            return {
                name: name,
                type: value.type,
                default: value.default == true,
            };
        case 'float':
        case 'int':
            return {
                name: name,
                type: value.type,
                default: Number(value.default),
                range: value.range,
            };
        case 'enum':
            return {
                name: name,
                type: 'enum',
                default: value.default,
                values: value.values,
                client_sync: value.client_sync,
            };
    }
}
//# sourceMappingURL=document.js.map