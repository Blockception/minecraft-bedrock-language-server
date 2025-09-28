"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_entityid_diagnose = behaviorpack_entityid_diagnose;
exports.behaviorpack_entity_spawnegg_diagnose = behaviorpack_entity_spawnegg_diagnose;
exports.behaviorpack_entity_event_diagnose = behaviorpack_entity_event_diagnose;
exports.command_entity_event_diagnose = command_entity_event_diagnose;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const types_1 = require("../../../types");
const definitions_1 = require("../../definitions");
const __1 = require("../..");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
/**
 * Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id The entity to check
 * @param diagnoser The diagnoser
 * @returns True if the entity exists
 */
function behaviorpack_entityid_diagnose(id, diagnoser) {
    let strId = typeof id === "string" ? id : id.text;
    let event = "";
    if (strId.includes("<")) {
        event = strId.replace(strId.split("<")[0], "").slice(1, -1);
        strId = strId.split("<")[0];
    }
    //No namespace?
    if (!strId.includes(":"))
        strId = "minecraft:" + strId;
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.entity, strId, diagnoser)) {
        return true;
    }
    const entityItem = diagnoser.context.getProjectData().behaviors.entities.get(strId, diagnoser.project);
    if (entityItem === undefined) {
        __1.Errors.missing("behaviors", "entities", strId, diagnoser, id);
        return false;
    }
    if (bc_minecraft_bedrock_project_1.DefinitionItem.is(entityItem)) {
        return true;
    }
    const entity = entityItem.item;
    //Project has entity
    if (event) {
        behaviorpack_entity_event_diagnose(event, `${strId}<${event}>`, entity.events, diagnoser);
    }
    return true;
}
/**Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
function behaviorpack_entity_spawnegg_diagnose(value, diagnoser) {
    const id = value.text.replace("_spawn_egg", "");
    behaviorpack_entityid_diagnose({ offset: value.offset, text: id }, diagnoser);
}
function behaviorpack_entity_event_diagnose(id, path, events, diagnoser) {
    if (!events)
        return;
    if (bc_minecraft_bedrock_project_1.Defined.is(events)) {
        if (events.defined.has(id))
            return;
    }
    else if (events.includes(id)) {
        return;
    }
    diagnoser.add(path, `Entity has no event "${id}"`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.event.missing");
}
/**Checks if the event is defined on the correct entities
 * @param data
 * @param builder
 * @param Com
 */
function command_entity_event_diagnose(data, diagnoser, Com) {
    var _a;
    const edu = (0, definitions_1.education_enabled)(diagnoser);
    const matches = Com.getBestMatch(edu);
    if (matches.length !== 1)
        return;
    const entityid_index = matches[0].parameters.findIndex((p) => p.type === bc_minecraft_bedrock_command_1.ParameterType.entity);
    let entityid = undefined;
    if (entityid_index >= 0) {
        entityid = (_a = Com.parameters[entityid_index]) === null || _a === void 0 ? void 0 : _a.text;
    }
    else {
        //TODO selector parsing?
    }
    if (entityid) {
        //Get entity
        const entity = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(entityid);
        //Entity found
        if (entity) {
            //Events not found
            if (!entity.events.defined.has(data.text)) {
                diagnoser.add(data.offset, `Entity: ${entityid} has no event declared: ${data.text}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.event.missing");
            }
        }
    }
}
//# sourceMappingURL=diagnose.js.map