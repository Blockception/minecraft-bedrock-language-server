import { Command, CommandData, Parameter, ParameterInfo, ParameterType } from 'bc-minecraft-bedrock-command';
import { Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { education_enabled } from '../../definitions';

import {
  general_boolean_diagnose,
  general_float_diagnose,
  general_integer_diagnose,
  general_keyword_diagnose,
  general_string_diagnose,
} from '../../general';
import {
  minecraft_check_command,
  minecraft_coordinate_diagnose,
  minecraft_effect_diagnose,
  minecraft_objectives_diagnose,
  minecraft_selector_diagnose,
  minecraft_tag_diagnose,
  minecraft_tickingarea_diagnose,
  minecraft_xp_diagnose,
} from '../../minecraft';
import { minecraft_jsonitem_diagnose } from '../../minecraft/json-item';
import { minecraft_jsonrawtext_diagnose } from '../../minecraft/json-rawtext';
import {
  mode_camera_shake_diagnose,
  mode_cause_type_diagnose,
  mode_clone_diagnose,
  mode_difficulty_diagnose,
  mode_dimension_diagnose,
  mode_easing_diagnose,
  mode_fill_diagnose,
  mode_gamemode_diagnose,
  mode_handtype_diagnose,
  mode_hud_element_diagnose,
  mode_hud_visibility_diagnose,
  mode_locate_feature_diagnose,
  mode_mask_diagnose,
  mode_mirror_diagnose,
  mode_music_repeat_diagnose,
  mode_old_block_diagnose,
  mode_operation_diagnose,
  mode_permission_diagnose,
  mode_permission_state_diagnose,
  mode_replace_diagnose,
  mode_ride_fill_diagnose,
  mode_ride_rules_diagnose,
  mode_rotation_diagnose,
  mode_save_diagnose,
  mode_scan_diagnose,
  mode_slot_type_diagnose,
  mode_slotid_diagnose,
  mode_structure_animation_diagnose,
  mode_teleport_rules_diagnose,
  mode_time_diagnose,
} from '../../mode/diagnose';
import { animation_reference_diagnose } from '../../resource-pack/anim-or-controller';
import { particle_is_defined } from '../../resource-pack/particle/diagnose';
import { resourcepack_sound_definitions_diagnose } from '../../resource-pack/sounds-definitions/diagnose';
import { behaviorpack_check_command_blockstates } from '../block-state/diagnose';
import { behaviorpack_check_blockdescriptor } from '../block/diagnose';
import {
  behaviorpack_entity_spawnegg_diagnose,
  behaviorpack_entityid_diagnose,
  command_entity_event_diagnose,
} from '../entity/diagnose';
import { behaviorpack_item_diagnose } from '../item/diagnose';
import { behaviorpack_loot_table_short_diagnose } from '../loot-table/diagnose';
import { diagnose_structure_implementation } from '../structure/diagnose';
import { mcfunction_is_defined } from './diagnose';

/**
 *
 * @param doc
 * @param diagnoser
 */
export function diagnose_mcfunction_commands_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const edu = education_enabled(diagnoser);
  const text = diagnoser.document.getText();
  const lines = text.split('\n');

  for (let I = 0; I < lines.length; I++) {
    const line = lines[I].trim();

    if (line === '') continue;
    //If the line is a whole comment then skip
    if (line.startsWith('#')) continue;

    const offset = text.indexOf(line);
    let comm: Command | undefined = Command.parse(line, offset);

    if (comm.isEmpty()) continue;

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
export function json_commandsCheck(prop: string | string[], diagnoser: DocumentDiagnosticsBuilder): void {
  if (typeof prop === 'string') {
    prop = [prop];
  }

  prop.forEach((p) => {
    if (p.startsWith('/')) {
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
export function commandsCheck(commandText: string, diagnoser: DocumentDiagnosticsBuilder): void {
  if (commandText.length < 3) return;

  const edu = education_enabled(diagnoser);
  const offset = diagnoser.document.getText().indexOf(commandText);
  let comm: Command | undefined = Command.parse(commandText, offset);

  if (comm.isEmpty()) return;

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
function diagnose_mcfunction_commands(command: Command, diagnoser: DocumentDiagnosticsBuilder, edu: boolean): void {
  const info = command.getBestMatch(edu);

  if (info.length === 0) {
    const keyCommand = command.getKeyword();

    //Vanilla has this command so only the syntax is valid
    if (CommandData.Vanilla[keyCommand] !== undefined) {
      return diagnoser.add(
        command.parameters[0].offset,
        `Unknown syntax for: "${keyCommand}"`,
        DiagnosticSeverity.error,
        `minecraft.commands.${keyCommand}.syntax`,
      );
    }

    //Edu has it
    if (CommandData.Edu[keyCommand] !== undefined) {
      if (edu) {
        return diagnoser.add(
          command.parameters[0].offset,
          `Unknown edu syntax for: "${keyCommand}"`,
          DiagnosticSeverity.error,
          `minecraft.commands.${keyCommand}.syntax`,
        );
      }

      return diagnoser.add(
        command.parameters[0].offset,
        `This is a edu command, but education is not turned on:\nYou can turn it on by setting \`education.enable=true\` in the settings`,
        DiagnosticSeverity.error,
        `project.settings`,
      );
    }

    return;
  }

  const data = info[0];
  const max = Math.min(data.parameters.length, command.parameters.length);

  //is syntax obsolete
  const obsolete = data.obsolete;
  if (typeof obsolete !== 'undefined') {
    const keyword = command.parameters[0];

    if (typeof obsolete === 'boolean') {
      diagnoser.add(
        keyword,
        `The syntax for this command is marked as obsolete`,
        DiagnosticSeverity.warning,
        `minecraft.commands.${keyword.text}.obsolete`,
      );
    } else {
      let { message } = obsolete;
      const { code, format_version } = obsolete;

      if (format_version) {
        message += `\nThis command is obsolete since format version: ${format_version}`;
      }

      diagnoser.add(keyword, message, DiagnosticSeverity.warning, code);
    }
  }

  for (let I = 0; I < max; I++) {
    mcfunction_diagnoseparameter(data.parameters[I], command.parameters[I], diagnoser, command, edu);
  }
}

type DiagnoseCommand = (value: Types.OffsetWord, diagnoser: DocumentDiagnosticsBuilder) => void | boolean;
/**Switch data*/
const ParameterDiagnostics: Record<number, DiagnoseCommand> = {
  [ParameterType.cameraShakeType]: mode_camera_shake_diagnose,
  [ParameterType.causeType]: mode_cause_type_diagnose,
  [ParameterType.damageCause]: mode_cause_type_diagnose,
  [ParameterType.cloneMode]: mode_clone_diagnose,
  [ParameterType.difficulty]: mode_difficulty_diagnose,
  [ParameterType.dimension]: mode_dimension_diagnose,
  [ParameterType.easing]: mode_easing_diagnose,
  [ParameterType.fillMode]: mode_fill_diagnose,
  [ParameterType.gamemode]: mode_gamemode_diagnose,
  [ParameterType.handType]: mode_handtype_diagnose,
  [ParameterType.hudVisibility]: mode_hud_visibility_diagnose,
  [ParameterType.hudElement]: mode_hud_element_diagnose,
  [ParameterType.locateFeature]: mode_locate_feature_diagnose,
  [ParameterType.maskMode]: mode_mask_diagnose,
  [ParameterType.mirror]: mode_mirror_diagnose,
  [ParameterType.musicRepeatMode]: mode_music_repeat_diagnose,
  [ParameterType.oldBlockMode]: mode_old_block_diagnose,
  [ParameterType.operation]: mode_operation_diagnose,
  [ParameterType.permission]: mode_permission_diagnose,
  [ParameterType.permissionState]: mode_permission_state_diagnose,
  [ParameterType.replaceMode]: mode_replace_diagnose,
  [ParameterType.ridefillMode]: mode_ride_fill_diagnose,
  [ParameterType.rideRules]: mode_ride_rules_diagnose,
  [ParameterType.rotation]: mode_rotation_diagnose,
  [ParameterType.saveMode]: mode_save_diagnose,
  [ParameterType.scanMode]: mode_scan_diagnose,
  [ParameterType.slotType]: mode_slot_type_diagnose,
  [ParameterType.structureAnimationMode]: mode_structure_animation_diagnose,
  [ParameterType.teleportRules]: mode_teleport_rules_diagnose,
  [ParameterType.time]: mode_time_diagnose,

  [ParameterType.animation]: animation_reference_diagnose,
  [ParameterType.block]: behaviorpack_check_blockdescriptor,
  [ParameterType.boolean]: general_boolean_diagnose,
  //Custom call [ParameterType.command]:,
  [ParameterType.coordinate]: minecraft_coordinate_diagnose,
  [ParameterType.effect]: minecraft_effect_diagnose,
  [ParameterType.entity]: behaviorpack_entityid_diagnose,
  //Custom call [ParameterType.event]:behaviorpack_entity_event_diagnose,
  [ParameterType.function]: mcfunction_is_defined,
  [ParameterType.float]: general_float_diagnose,
  [ParameterType.integer]: general_integer_diagnose,
  [ParameterType.item]: (item, diagnoser) => {
    if (item.text.endsWith('_spawn_egg')) {
      behaviorpack_entity_spawnegg_diagnose(item, diagnoser);
    } else {
      behaviorpack_item_diagnose(item, diagnoser);
    }
  },
  [ParameterType.jsonItem]: minecraft_jsonitem_diagnose,
  [ParameterType.jsonRawText]: minecraft_jsonrawtext_diagnose,
  //Custom call [ParameterType.keyword]:general_keyword_diagnose,
  [ParameterType.lootTable]: behaviorpack_loot_table_short_diagnose,
  //Custom call [ParameterType.message]:,
  [ParameterType.objective]: minecraft_objectives_diagnose,
  [ParameterType.particle]: particle_is_defined,
  //Custom call [ParameterType.selector]:minecraft_selector_diagnose,
  //Custom call [ParameterType.slotID]:,
  [ParameterType.sound]: resourcepack_sound_definitions_diagnose,
  [ParameterType.string]: general_string_diagnose,
  [ParameterType.structure]: diagnose_structure_implementation,
  [ParameterType.tag]: minecraft_tag_diagnose,
  [ParameterType.tickingarea]: minecraft_tickingarea_diagnose,
  //Custom call ParameterType.unknown]:(item, diagnoser)=>diagnoser.add(item.offset, "Unknown parametype: " + item.type, DiagnosticSeverity.warning, "debugger.error"),
  [ParameterType.xp]: minecraft_xp_diagnose,
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
function mcfunction_diagnoseparameter(
  pattern: ParameterInfo,
  data: Parameter,
  diagnoser: DocumentDiagnosticsBuilder,
  Com: Command,
  edu: boolean,
): void | boolean {
  if (pattern === undefined || data === undefined) return;

  if (pattern.options) {
    //If wildcard is allowed and the text is an wildcard, then skip diagnose
    if (pattern.options.wildcard === true) {
      if (data.text === '*') return;
    }

    //If accepted values is filled in and the text is a match, then skip diagnose
    if (pattern.options.acceptedValues?.includes(data.text)) {
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
    case ParameterType.blockStates:
      const index = Com.parameters.findIndex((p) => p == data);
      const previous = Com.parameters[index - 1];
      if (previous) {
        behaviorpack_check_command_blockstates(previous, data, diagnoser);
      }
      return;

    case ParameterType.command:
      return minecraft_check_command(data, diagnoser, edu);
    case ParameterType.event:
      return command_entity_event_diagnose(data, diagnoser, Com);
    case ParameterType.keyword:
      return general_keyword_diagnose(pattern.text, data, diagnoser);
    case ParameterType.message:
      return true; //TODO message check
    case ParameterType.selector:
      return minecraft_selector_diagnose(pattern, data, diagnoser);
    case ParameterType.slotID:
      return mode_slotid_diagnose(data, Com, diagnoser);

    case ParameterType.unknown:
      diagnoser.add(
        data.offset,
        `Unknown parameter type: ${pattern.type}:${ParameterType[pattern.type]}`,
        DiagnosticSeverity.warning,
        'debugger.error',
      );
      return false;
  }
}
