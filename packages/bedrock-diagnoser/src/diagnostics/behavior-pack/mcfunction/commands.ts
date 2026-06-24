import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Command, CustomCommandLookup, CommandData, Parameter, ParameterInfo, ParameterType } from 'bc-minecraft-bedrock-command';
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
  minecraft_coordinate_set_diagnose,
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
  modeCameraShakeDiagnose,
  modeCauseTypeDiagnose,
  modeCloneDiagnose,
  modeDifficultyDiagnose,
  modeDimensionDiagnose,
  modeEasingDiagnose,
  modeFillDiagnose,
  modeGamemodeDiagnose,
  modeHandtypeDiagnose,
  modeHudElementDiagnose,
  modeHudVisibilityDiagnose,
  modeLocateFeatureDiagnose,
  modeMaskDiagnose,
  modeMirrorDiagnose,
  modeMusicRepeatDiagnose,
  modeOldBlockDiagnose,
  modeOperationDiagnose,
  modePermissionDiagnose,
  modePermissionStateDiagnose,
  modeReplaceDiagnose,
  modeRideFillDiagnose,
  modeRideRulesDiagnose,
  modeRotationDiagnose,
  modeSaveDiagnose,
  modeScanDiagnose,
  modeScoreComparatorDiagnose,
  modeSlotTypeDiagnose,
  mode_slotid_diagnose,
  modeStructureAnimationDiagnose,
  modeTeleportRulesDiagnose,
  modeTimeDiagnose,
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
  let offset = diagnoser.document.getText().indexOf(commandText);
  if (offset < 0) {
    // json escape the commandText and try again
    const escaped = JSON.stringify(commandText).slice(1, -1);
    offset = diagnoser.document.getText().indexOf(escaped);
  }

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
  const customCommands = (name: string) =>
    diagnoser.context.getProjectData().projectData.behaviorPacks.customCommands.get(name)?.syntaxes;
  const info = command.getBestMatch(edu, customCommands);

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

    if (customCommands(keyCommand) !== undefined) {
      return diagnoser.add(
        command.parameters[0].offset,
        `Unknown syntax for custom command: "${keyCommand}"`,
        DiagnosticSeverity.error,
        `minecraft.commands.${keyCommand}.syntax`,
      );
    }

    //Execute subcommand exists but its syntax is invalid
    if (command.subType === ParameterType.executeSubcommand && CommandData.ExecuteSubcommands[keyCommand] !== undefined) {
      return diagnoser.add(
        command.parameters[0].offset,
        `Unknown syntax for: "${keyCommand}"`,
        DiagnosticSeverity.error,
        `minecraft.commands.${keyCommand}.syntax`,
      );
    }

    return minecraft_check_command(command.parameters[0], diagnoser, edu, customCommands);
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
      const { code, format_version: formatVersion } = obsolete;

      if (formatVersion) {
        message += `\nThis command is obsolete since format version: ${formatVersion}`;
      }

      diagnoser.add(keyword, message, DiagnosticSeverity.warning, code);
    }
  }

  for (let i = 0; i < max; i++) {
    mcfunction_diagnoseparameter(data.parameters[i], command.parameters[i], diagnoser, command, edu, customCommands);
  }

  // Validate coordinate groups: each x,y,z triplet must be fully provided and must not mix local/non-local types.
  // Pass all matching overloads so the best coordinate layout is selected automatically.
  minecraft_coordinate_set_diagnose(info, command.parameters, diagnoser);
}

type DiagnoseCommand = (value: OffsetWord, diagnoser: DocumentDiagnosticsBuilder) => void | boolean;
/**Switch data*/
const ParameterDiagnostics: Record<number, DiagnoseCommand> = {
  [ParameterType.cameraShakeType]: modeCameraShakeDiagnose,
  [ParameterType.causeType]: modeCauseTypeDiagnose,
  [ParameterType.damageCause]: modeCauseTypeDiagnose,
  [ParameterType.cloneMode]: modeCloneDiagnose,
  [ParameterType.difficulty]: modeDifficultyDiagnose,
  [ParameterType.dimension]: modeDimensionDiagnose,
  [ParameterType.easing]: modeEasingDiagnose,
  [ParameterType.fillMode]: modeFillDiagnose,
  [ParameterType.gamemode]: modeGamemodeDiagnose,
  [ParameterType.handType]: modeHandtypeDiagnose,
  [ParameterType.hudVisibility]: modeHudVisibilityDiagnose,
  [ParameterType.hudElement]: modeHudElementDiagnose,
  [ParameterType.locateFeature]: modeLocateFeatureDiagnose,
  [ParameterType.maskMode]: modeMaskDiagnose,
  [ParameterType.mirror]: modeMirrorDiagnose,
  [ParameterType.musicRepeatMode]: modeMusicRepeatDiagnose,
  [ParameterType.oldBlockMode]: modeOldBlockDiagnose,
  [ParameterType.operation]: modeOperationDiagnose,
  [ParameterType.scoreComparator]: modeScoreComparatorDiagnose,
  [ParameterType.permission]: modePermissionDiagnose,
  [ParameterType.permissionState]: modePermissionStateDiagnose,
  [ParameterType.replaceMode]: modeReplaceDiagnose,
  [ParameterType.ridefillMode]: modeRideFillDiagnose,
  [ParameterType.rideRules]: modeRideRulesDiagnose,
  [ParameterType.rotation]: modeRotationDiagnose,
  [ParameterType.saveMode]: modeSaveDiagnose,
  [ParameterType.scanMode]: modeScanDiagnose,
  [ParameterType.slotType]: modeSlotTypeDiagnose,
  [ParameterType.structureAnimationMode]: modeStructureAnimationDiagnose,
  [ParameterType.teleportRules]: modeTeleportRulesDiagnose,
  [ParameterType.time]: modeTimeDiagnose,

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
  customCommands: CustomCommandLookup,
): void | boolean {
  if (pattern === undefined || data === undefined) return;

  if (pattern.options) {
    //If wildcard is allowed and the text is an wildcard, then skip diagnose
    if (pattern.options.wildcard === true) {
      if (data.text === '*' || data.text === '"*"') return;
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
      return minecraft_check_command(data, diagnoser, edu, customCommands);
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
