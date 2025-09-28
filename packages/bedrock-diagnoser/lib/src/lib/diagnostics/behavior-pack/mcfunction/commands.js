"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_mcfunction_commands_document = diagnose_mcfunction_commands_document;
exports.json_commandsCheck = json_commandsCheck;
exports.commandsCheck = commandsCheck;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const types_1 = require("../../../types");
const definitions_1 = require("../../definitions");
const general_1 = require("../../general");
const minecraft_1 = require("../../minecraft");
const json_item_1 = require("../../minecraft/json-item");
const json_rawtext_1 = require("../../minecraft/json-rawtext");
const diagnose_1 = require("../../mode/diagnose");
const anim_or_controller_1 = require("../../resource-pack/anim-or-controller");
const diagnose_2 = require("../../resource-pack/particle/diagnose");
const diagnose_3 = require("../../resource-pack/sounds-definitions/diagnose");
const diagnose_4 = require("../block-state/diagnose");
const diagnose_5 = require("../block/diagnose");
const diagnose_6 = require("../entity/diagnose");
const diagnose_7 = require("../item/diagnose");
const diagnose_8 = require("../loot-table/diagnose");
const diagnose_9 = require("../structure/diagnose");
const diagnose_10 = require("./diagnose");
/**
 *
 * @param doc
 * @param diagnoser
 */
function diagnose_mcfunction_commands_document(diagnoser) {
    const edu = (0, definitions_1.education_enabled)(diagnoser);
    const text = diagnoser.document.getText();
    const lines = text.split("\n");
    for (let I = 0; I < lines.length; I++) {
        const line = lines[I].trim();
        if (line === "")
            continue;
        //If the line is a whole comment then skip
        if (line.startsWith("#"))
            continue;
        const offset = text.indexOf(line);
        let comm = bc_minecraft_bedrock_command_1.Command.parse(line, offset);
        if (comm.isEmpty())
            continue;
        while (comm) {
            diagnose_mcfunction_commands(comm, diagnoser, edu);
            comm = comm.getSubCommand();
        }
    }
}
/**
 *
 * @param prop
 * @param diagnoser
 */
function json_commandsCheck(prop, diagnoser) {
    if (typeof prop === "string") {
        prop = [prop];
    }
    prop.forEach((p) => {
        if (p.startsWith("/")) {
            commandsCheck(p.substring(1), diagnoser);
        }
    });
}
/**
 *
 * @param commandText
 * @param doc
 * @param diagnoser
 * @returns
 */
function commandsCheck(commandText, diagnoser) {
    if (commandText.length < 3)
        return;
    const edu = (0, definitions_1.education_enabled)(diagnoser);
    const offset = diagnoser.document.getText().indexOf(commandText);
    let comm = bc_minecraft_bedrock_command_1.Command.parse(commandText, offset);
    if (comm.isEmpty())
        return;
    while (comm) {
        diagnose_mcfunction_commands(comm, diagnoser, edu);
        comm = comm.getSubCommand();
    }
}
/**
 *
 * @param command
 * @param diagnoser
 * @param edu
 * @returns
 */
function diagnose_mcfunction_commands(command, diagnoser, edu) {
    const info = command.getBestMatch(edu);
    if (info.length === 0) {
        const keyCommand = command.getKeyword();
        //Vanilla has this command so only the syntax is valid
        if (bc_minecraft_bedrock_command_1.CommandData.Vanilla[keyCommand] !== undefined) {
            return diagnoser.add(command.parameters[0].offset, `Unknown syntax for: "${keyCommand}"`, types_1.DiagnosticSeverity.error, `minecraft.commands.${keyCommand}.syntax`);
        }
        //Edu has it
        if (bc_minecraft_bedrock_command_1.CommandData.Edu[keyCommand] !== undefined) {
            if (edu) {
                return diagnoser.add(command.parameters[0].offset, `Unknown edu syntax for: "${keyCommand}"`, types_1.DiagnosticSeverity.error, `minecraft.commands.${keyCommand}.syntax`);
            }
            return diagnoser.add(command.parameters[0].offset, `This is a edu command, but education is not turned on:\nYou can turn it on by setting \`education.enable=true\` in the settings`, types_1.DiagnosticSeverity.error, `project.settings`);
        }
        return;
    }
    const data = info[0];
    const max = Math.min(data.parameters.length, command.parameters.length);
    //is syntax obsolete
    const obsolete = data.obsolete;
    if (typeof obsolete !== "undefined") {
        const keyword = command.parameters[0];
        if (typeof obsolete === "boolean") {
            diagnoser.add(keyword, `The syntax for this command is marked as obsolete`, types_1.DiagnosticSeverity.warning, `minecraft.commands.${keyword.text}.obsolete`);
        }
        else {
            let { message } = obsolete;
            const { code, format_version } = obsolete;
            if (format_version) {
                message += `\nThis command is obsolete since format version: ${format_version}`;
            }
            diagnoser.add(keyword, message, types_1.DiagnosticSeverity.warning, code);
        }
    }
    for (let I = 0; I < max; I++) {
        mcfunction_diagnoseparameter(data.parameters[I], command.parameters[I], diagnoser, command, edu);
    }
}
/**Switch data*/
const ParameterDiagnostics = {
    [bc_minecraft_bedrock_command_1.ParameterType.cameraShakeType]: diagnose_1.mode_camera_shake_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.causeType]: diagnose_1.mode_cause_type_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.damageCause]: diagnose_1.mode_cause_type_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.cloneMode]: diagnose_1.mode_clone_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.difficulty]: diagnose_1.mode_difficulty_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.dimension]: diagnose_1.mode_dimension_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.easing]: diagnose_1.mode_easing_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.fillMode]: diagnose_1.mode_fill_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.gamemode]: diagnose_1.mode_gamemode_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.handType]: diagnose_1.mode_handtype_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.hudVisibility]: diagnose_1.mode_hud_visibility_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.hudElement]: diagnose_1.mode_hud_element_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.locateFeature]: diagnose_1.mode_locate_feature_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.maskMode]: diagnose_1.mode_mask_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.mirror]: diagnose_1.mode_mirror_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.musicRepeatMode]: diagnose_1.mode_music_repeat_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.oldBlockMode]: diagnose_1.mode_old_block_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.operation]: diagnose_1.mode_operation_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.permission]: diagnose_1.mode_permission_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.permissionState]: diagnose_1.mode_permission_state_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.replaceMode]: diagnose_1.mode_replace_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.ridefillMode]: diagnose_1.mode_ride_fill_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.rideRules]: diagnose_1.mode_ride_rules_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.rotation]: diagnose_1.mode_rotation_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.saveMode]: diagnose_1.mode_save_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.scanMode]: diagnose_1.mode_scan_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.slotType]: diagnose_1.mode_slot_type_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.structureAnimationMode]: diagnose_1.mode_structure_animation_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.teleportRules]: diagnose_1.mode_teleport_rules_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.time]: diagnose_1.mode_time_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.animation]: anim_or_controller_1.animation_reference_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.block]: diagnose_5.behaviorpack_check_blockdescriptor,
    [bc_minecraft_bedrock_command_1.ParameterType.boolean]: general_1.general_boolean_diagnose,
    //Custom call [ParameterType.command]:,
    [bc_minecraft_bedrock_command_1.ParameterType.coordinate]: minecraft_1.minecraft_coordinate_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.effect]: minecraft_1.minecraft_effect_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.entity]: diagnose_6.behaviorpack_entityid_diagnose,
    //Custom call [ParameterType.event]:behaviorpack_entity_event_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.function]: diagnose_10.mcfunction_is_defined,
    [bc_minecraft_bedrock_command_1.ParameterType.float]: general_1.general_float_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.integer]: general_1.general_integer_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.item]: (item, diagnoser) => {
        if (item.text.endsWith("_spawn_egg")) {
            (0, diagnose_6.behaviorpack_entity_spawnegg_diagnose)(item, diagnoser);
        }
        else {
            (0, diagnose_7.behaviorpack_item_diagnose)(item, diagnoser);
        }
    },
    [bc_minecraft_bedrock_command_1.ParameterType.jsonItem]: json_item_1.minecraft_jsonitem_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.jsonRawText]: json_rawtext_1.minecraft_jsonrawtext_diagnose,
    //Custom call [ParameterType.keyword]:general_keyword_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.lootTable]: diagnose_8.behaviorpack_loot_table_short_diagnose,
    //Custom call [ParameterType.message]:,
    [bc_minecraft_bedrock_command_1.ParameterType.objective]: minecraft_1.minecraft_objectives_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.particle]: diagnose_2.particle_is_defined,
    //Custom call [ParameterType.selector]:minecraft_selector_diagnose,
    //Custom call [ParameterType.slotID]:,
    [bc_minecraft_bedrock_command_1.ParameterType.sound]: diagnose_3.resourcepack_sound_definitions_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.string]: general_1.general_string_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.structure]: diagnose_9.diagnose_structure_implementation,
    [bc_minecraft_bedrock_command_1.ParameterType.tag]: minecraft_1.minecraft_tag_diagnose,
    [bc_minecraft_bedrock_command_1.ParameterType.tickingarea]: minecraft_1.minecraft_tickingarea_diagnose,
    //Custom call ParameterType.unknown]:(item, diagnoser)=>diagnoser.add(item.offset, "Unknown parametype: " + item.type, DiagnosticSeverity.warning, "debugger.error"),
    [bc_minecraft_bedrock_command_1.ParameterType.xp]: minecraft_1.minecraft_xp_diagnose,
};
/**
 *
 * @param pattern
 * @param data
 * @param diagnoser
 * @param Com
 * @param edu
 * @returns
 */
function mcfunction_diagnoseparameter(pattern, data, diagnoser, Com, edu) {
    var _a;
    if (pattern === undefined || data === undefined)
        return;
    if (pattern.options) {
        //If wildcard is allowed and the text is an wildcard, then skip diagnose
        if (pattern.options.wildcard === true) {
            if (data.text === "*")
                return;
        }
        //If accepted values is filled in and the text is a match, then skip diagnose
        if ((_a = pattern.options.acceptedValues) === null || _a === void 0 ? void 0 : _a.includes(data.text)) {
            return;
        }
    }
    //Get specific call
    const call = ParameterDiagnostics[pattern.type];
    //If call is found, then use that
    if (call) {
        return call(data, diagnoser);
    }
    //Custom calls
    switch (pattern.type) {
        case bc_minecraft_bedrock_command_1.ParameterType.blockStates:
            const index = Com.parameters.findIndex((p) => p == data);
            const previous = Com.parameters[index - 1];
            if (previous) {
                (0, diagnose_4.behaviorpack_check_command_blockstates)(previous, data, diagnoser);
            }
            return;
        case bc_minecraft_bedrock_command_1.ParameterType.command:
            return (0, minecraft_1.minecraft_check_command)(data, diagnoser, edu);
        case bc_minecraft_bedrock_command_1.ParameterType.event:
            return (0, diagnose_6.command_entity_event_diagnose)(data, diagnoser, Com);
        case bc_minecraft_bedrock_command_1.ParameterType.keyword:
            return (0, general_1.general_keyword_diagnose)(pattern.text, data, diagnoser);
        case bc_minecraft_bedrock_command_1.ParameterType.message:
            return true; //TODO message check
        case bc_minecraft_bedrock_command_1.ParameterType.selector:
            return (0, minecraft_1.minecraft_selector_diagnose)(pattern, data, diagnoser);
        case bc_minecraft_bedrock_command_1.ParameterType.slotID:
            return (0, diagnose_1.mode_slotid_diagnose)(data, Com, diagnoser);
        case bc_minecraft_bedrock_command_1.ParameterType.unknown:
            diagnoser.add(data.offset, `Unknown parameter type: ${pattern.type}:${bc_minecraft_bedrock_command_1.ParameterType[pattern.type]}`, types_1.DiagnosticSeverity.warning, "debugger.error");
            return false;
    }
}
//# sourceMappingURL=commands.js.map