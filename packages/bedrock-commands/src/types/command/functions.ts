import { Command } from './command';
import { CommandData, CommandInfo } from '../../data';
import { ParameterType } from '../parameter-type';
import { General, Minecraft, Modes } from 'bc-minecraft-bedrock-types';

/**Gets the best matching commandInfo data, if multiple are returned, it unclear or somewhere not fully specified
 * @param command The command to search through
 * @param edu Whether or not to include education data
 * @returns An array with commands info*/
export function getBestMatches(command: Command, edu: boolean = false): CommandInfo[] {
  let m = command.getCommandData(edu);

  if (m.length === 1) return m;

  m = m.filter((x) => isMatch(command, x, edu));

  if (m.length > 1) {
    const n = m.filter((x) => checkRequiredParameterLength(command, x));
    if (n.length === 0) return m;

    return n;
  }

  return m;
}

/**Checks if the command matches the commandInfo
 * @param command The command to examine
 * @param data The commandInfo serving as the basis
 * @param edu If education content should be used or not
 * @returns true or false is this commandInfo matches the command*/
export function isMatch(command: Command, data: CommandInfo, edu: boolean = false): boolean {
  let Limit = data.parameters.length;

  if (Limit > command.parameters.length) {
    Limit = command.parameters.length;
  }

  for (let I = 0; I < Limit; I++) {
    const commandPar = command.parameters[I];
    const commandText = commandPar.text;
    const patPar = data.parameters[I];

    if (patPar.options?.acceptedValues?.includes(commandText)) {
      continue;
    }

    const match = Matches[patPar.type];
    if (match) {
      if (!match(commandText)) return false;
      continue;
    }

    switch (patPar.type) {
      case ParameterType.block:
      case ParameterType.entity:
      case ParameterType.event:
      case ParameterType.function:
      case ParameterType.item:
      case ParameterType.message:
      case ParameterType.objective:
      case ParameterType.particle:
      case ParameterType.sound:
      case ParameterType.tag:
      case ParameterType.tickingarea:
      case ParameterType.unknown:
        //TODO program matches types for these
        continue;

      case ParameterType.command:
        if (!IsCommand(commandText, edu)) return false;
        break;

      case ParameterType.effect:
        if (commandText === 'clear') return false;
        break;

      case ParameterType.executeSubcommand:
        if (!IsExecuteSubcommand(commandText)) return false;
        break;

      case ParameterType.keyword:
        if (commandText != patPar.text) return false;
        break;

      case ParameterType.selector:
        const { wildcard, allowFakePlayers } = patPar.options ?? {};
        if (!Minecraft.Selector.Selector.isSelector(commandText, wildcard, allowFakePlayers)) return false;
        break;
    }
  }

  return true;
}

const Matches: Partial<Record<ParameterType, (item: string) => boolean>> = {
  [ParameterType.blockStates]: (item) => General.Json.isArray(item),
  [ParameterType.boolean]: (item) => General.Boolean.is(item),
  [ParameterType.cameraShakeType]: (item) => Modes.CameraShake.isValue(item),
  [ParameterType.causeType]: (item) => Modes.CauseType.isValue(item),
  [ParameterType.cloneMode]: (item) => Modes.Clone.isValue(item),
  [ParameterType.coordinate]: (item) => Minecraft.Coordinate.is(item),
  [ParameterType.damageCause]: (item) => Modes.CauseType.isValue(item),
  [ParameterType.dimension]: (item) => Modes.Dimension.isValue(item),
  [ParameterType.difficulty]: (item) => Modes.Difficulty.isValue(item),
  [ParameterType.easing]: (item) => Modes.Easing.isValue(item),
  [ParameterType.fillMode]: (item) => Modes.Fill.isValue(item),
  [ParameterType.float]: (item) => General.Float.is(item),
  [ParameterType.gamemode]: (item) => Modes.Gamemode.isValue(item),
  [ParameterType.handType]: (item) => Modes.HandType.isValue(item),
  [ParameterType.hudElement]: (item) => Modes.HudElement.isValue(item),
  [ParameterType.hudVisibility]: (item) => Modes.HudVisibility.isValue(item),
  [ParameterType.integer]: (item) => General.Integer.is(item),
  [ParameterType.jigsaw]: (item) => General.String.is(item),
  [ParameterType.jsonItem]: (item) => General.Json.isObject(item),
  [ParameterType.jsonRawText]: (item) => General.Json.isObject(item),
  [ParameterType.locateFeature]: (item) => Modes.LocateFeature.isValue(item),
  [ParameterType.lootTable]: (item) => General.String.is(item),
  [ParameterType.maskMode]: (item) => Modes.Mask.isValue(item),
  [ParameterType.mirror]: (item) => Modes.Mirror.isValue(item),
  [ParameterType.musicRepeatMode]: (item) => Modes.MusicRepeat.isValue(item),
  [ParameterType.oldBlockMode]: (item) => Modes.OldBlock.isValue(item),
  [ParameterType.operation]: (item) => Modes.Operation.isValue(item),
  [ParameterType.replaceMode]: (item) => Modes.Replace.isValue(item),
  [ParameterType.rideRules]: (item) => Modes.RideRules.isValue(item),
  [ParameterType.ridefillMode]: (item) => Modes.RideFill.isValue(item),
  [ParameterType.rotation]: (item) => Modes.Rotation.isValue(item),
  [ParameterType.saveMode]: (item) => Modes.Save.isValue(item),
  [ParameterType.slotID]: (item) => General.Integer.is(item),
  [ParameterType.slotType]: (item) => Modes.SlotType.isValue(item),
  [ParameterType.string]: (item) => General.String.is(item),
  [ParameterType.structureAnimationMode]: (item) => Modes.StructureAnimation.isValue(item),
  [ParameterType.teleportRules]: (item) => Modes.TeleportRules.isValue(item),
  [ParameterType.time]: (item) => Modes.Time.isValue(item),
  [ParameterType.timeInTicks]: (item) => Modes.Time.isValue(item),
  [ParameterType.xp]: (item) => Minecraft.XP.is(item),
};

export function checkRequiredParameterLength(command: Command, data: CommandInfo): boolean {
  let required = 0;

  for (let I = 0; I < data.parameters.length; I++) {
    const par = data.parameters[I];
    if (par.required) {
      required++;
    } else {
      break;
    }
  }

  if (command.parameters.length < required) {
    return false;
  }

  return true;
}

/**Retrieves the command data related to the given keyword
 * @param name The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns An array with commands info*/
export function getCommandData(
  name: string,
  edu: boolean = false,
  type: ParameterType = ParameterType.command,
): CommandInfo[] {
  const out: CommandInfo[] = [];

  if (type == ParameterType.executeSubcommand) {
    Add(out, CommandData.ExecuteSubcommands[name]);
  }

  if (type == ParameterType.command) {
    Add(out, CommandData.Vanilla[name]);

    if (edu) Add(out, CommandData.Edu[name]);
  }

  return out;
}

/**Checks if the given commandData is present
 * @param name The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns An array with commands info*/
export function hasCommandData(name: string, edu: boolean = false): boolean {
  if (CommandData.Vanilla[name]) return true;
  if (edu && CommandData.Edu[name]) return true;

  return false;
}

/**Checks if the given commandData is present
 * @param command The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns True or false*/
export function IsCommand(command: string, edu: boolean = false): boolean {
  if (CommandData.Vanilla[command]) return true;
  if (edu && CommandData.Edu[command]) return true;

  return false;
}

/** Checks if the given command is a execute sub command
 * @param command The command to check
 * @returns True or false*/
export function IsExecuteSubcommand(command: string) {
  return CommandData.ExecuteSubcommands[command] != undefined;
}

function Add(receiver: CommandInfo[], items: CommandInfo[] | undefined): void {
  if (items) receiver.push(...items);
}
