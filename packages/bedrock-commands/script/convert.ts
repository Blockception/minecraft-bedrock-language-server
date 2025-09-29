import { CommandInfo, ParameterInfo } from '../src/lib/data/command-info';
import { ParameterType } from '../src/lib/types/parameter-type';
import { Command, CommandOverload, CommandParameter, MinecraftCommandData } from './minecraft-data';
import { mutate } from './mutate';

const removed = [
  'connect',
  'list',
  'ops',
  'project',
  'reload',
  'reloadconfig',
  'sendshowstoreoffer',
  'sendshowstoreoffer',
  'stop',
  'transfer',
  'wsserver',
];

export function convert(data: MinecraftCommandData): Record<string, CommandInfo[]> {
  const result: Record<string, CommandInfo[]> = {};

  data.commands
    .filter((c) => !removed.includes(c.name))
    .forEach((c) => {
      const r = convertCommand(c);
      r.forEach((item) => {
        if (!result[item.name]) {
          result[item.name] = [];
        }
        result[item.name].push(item);
      });
    });

  // Sort
  console.log('==== Sorting ====');
  for (const [key, value] of Object.entries(result)) {
    result[key] = value.sort((a, b) => {
      let i: number = 0;
      if ((i = a.name.localeCompare(b.name)) != 0) return i;

      const m = Math.min(a.parameters.length, b.parameters.length);
      for (let j = 0; j < m; j++) {
        if ((i = a.parameters[j].text.localeCompare(b.parameters[j].text)) != 0) return i;
      }

      return 0;
    });
  }

  return result;
}

function convertCommand(data: Command): Array<CommandInfo> {
  mutate(data);
  data.name = data.name === '?' ? 'help' : data.name;

  const result: Array<CommandInfo> = [];

  data.overloads.forEach((overload) => {
    const base: CommandInfo = {
      name: data.name,
      documentation: data.description,
      parameters: [],
      permission_level: data.permission_level,
    };

    result.push(convertC(base, overload));
  });

  data.aliases.forEach((alias) => {
    alias.name = alias.name === '?' ? 'help' : alias.name;

    const base: CommandInfo = {
      name: alias.name,
      documentation: data.description,
      parameters: [],
      permission_level: data.permission_level,
    };
    data.overloads.forEach((overload) => {
      result.push(convertC(base, overload));
    });
  });

  return result;
}

function convertC(base: CommandInfo, overload: CommandOverload): CommandInfo {
  const commandInfo: CommandInfo = {
    ...base,
    parameters: [
      {
        text: base.name,
        type: ParameterType.keyword,
        required: true,
      },
    ],
  };

  overload.params.map((item) => convertParameter(base.name, item, commandInfo.parameters));
  console.log('  command ->', commandInfo.parameters.map((i) => i.text).join(' '));

  return commandInfo;
}

function convertParameter(comm: string, param: CommandParameter, receiver: ParameterInfo[]) {
  const name = param.name;
  const required = !param.is_optional;

  switch (param.type.name) {
    case 'POSITION':
    case 'POSITION_FLOAT':
      receiver.push(
        {
          text: name + ' x',
          type: ParameterType.coordinate,
          required: required,
        },
        {
          text: name + ' y',
          type: ParameterType.coordinate,
          required: required,
        },
        {
          text: name + ' z',
          type: ParameterType.coordinate,
          required: required,
        },
      );
      break;
    case 'ROT':
    case 'ROTATION':
      receiver.push(
        {
          text: name + ' yaw',
          type: ParameterType.rotation,
          required: required,
        },
        {
          text: name + ' pitch',
          type: ParameterType.rotation,
          required: required,
        },
      );
      break;
    default:
      const b = {
        text: fixName(name),
        type: ParameterType.unknown,
        required: required,
      };
      if (param.type.name in keyWordReplace) {
        b.text = keyWordReplace[param.type.name];
        b.type = ParameterType.keyword;
      } else {
        b.type = converType(comm, name, param.type.name);
      }

      receiver.push(b);
  }
}

function fixName(name: string): string {
  const n = 'ABCDEFGHIJKLMNOPQRSTUVWYX';
  for (const c of n.split('')) {
    name = name.replaceAll(c, ' ' + c.toLowerCase());
  }
  name = name.replaceAll('_', ' ');

  return name;
}

function converType(comm: string, name: string, type: string): ParameterType {
  if (type in enumMap) {
    return enumMap[type];
  }

  if (type === 'ID') {
    switch (true) {
      case comm === 'allowlist' && name === 'name':
      case comm === 'aimassist' && name === 'preset id':
      case comm === 'dialogue' && name === 'sceneName':
        return ParameterType.string;
      case comm === 'fog' && name === 'fogId':
        return ParameterType.fog;
      case comm === 'fog' && name === 'userProvidedId':
        return ParameterType.string;
      case comm === 'gametest' && name === 'testName':
        return ParameterType.string;
      case comm === 'loot' && name === 'loot_table':
        return ParameterType.lootTable;
      case comm === 'music' && name === 'trackName':
        return ParameterType.music;
      case comm === 'place' && name === 'jigsawTarget':
        return ParameterType.jigsaw;
      case comm === 'playanimation' && name === 'animation':
        return ParameterType.animation;
      case comm === 'particle' && name === 'effect':
        return ParameterType.particle;
      case comm === 'playanimation' && name === 'stop_expression':
      case comm === 'playanimation' && name === 'next_state':
      case comm === 'playanimation' && name === 'controller':
        return ParameterType.string;
      case comm === 'playsound' && name === 'sound':
      case comm === 'stopsound' && name === 'sound':
        return ParameterType.sound;
      case comm === 'scoreboard' && name === 'displayName':
        return ParameterType.string;
      case comm === 'script' && name === 'host':
      case comm === 'scriptevent' && name === 'name':
      case comm === 'scriptevent' && name === 'messageId':
      case comm === 'scriptevent' && name === 'message':
      case comm === 'structure' && name === 'seed':
        return ParameterType.string;
      case comm === 'structure' && name === 'name':
        return ParameterType.structure;
      case comm === 'ride' && name === 'spawnEvent':
      case comm === 'ride' && name === 'nameTag':
      case comm === 'summon' && name === 'nameTag':
      case comm === 'transfer' && name === 'server':
        return ParameterType.string;
      case comm === 'schedule' && name === 'name':
      case comm === 'tickingarea' && name === 'name':
        return ParameterType.tickingarea;
      case comm === 'whitelist' && name === 'name':
        return ParameterType.selector;
    }
  }

  if (type === 'JSON_OBJECT') {
    switch (name) {
      case 'raw json titleText':
      case 'titleText':
      case 'raw json message':
        return ParameterType.jsonRawText;
      case 'components':
        return ParameterType.jsonItem;
      default:
    }
  }

  if (type.startsWith('postfix_')) {
    switch (name) {
      case 'time':
        return ParameterType.time;
      default:
    }
  }

  console.log('unknown type', comm, name, type);
  return ParameterType.unknown;
}

const enumMap: Record<string, ParameterType> = {
  AIMASSISTTARGETMODE: ParameterType.keyword,
  BIOME: ParameterType.biome,
  BLOCK_STATE_ARRAY: ParameterType.blockStates,
  BLOCK: ParameterType.block,
  BOOLEAN: ParameterType.boolean,
  CAMERAPRESETS: ParameterType.cameraPresets,
  CAMERASHAKETYPE: ParameterType.cameraShakeType,
  CLONEMODE: ParameterType.cloneMode,
  CODEBUILDERARGS: ParameterType.executeSubcommand,
  COMMANDNAME: ParameterType.command,
  COMPAREOPERATOR: ParameterType.operation,
  DAMAGECAUSE: ParameterType.causeType,
  DIFFICULTY: ParameterType.difficulty,
  DIMENSION: ParameterType.dimension,
  EFFECT: ParameterType.effect,
  ENCHANT: ParameterType.enchant,
  ENTITYEQUIPMENTSLOT: ParameterType.slotType,
  ENTITYEVENTS: ParameterType.event,
  ENTITYTYPE: ParameterType.entity,
  EXECUTECHAINEDOPTION_0: ParameterType.executeSubcommand,
  EASING: ParameterType.easing,
  FEATURERULES: ParameterType.locateFeature,
  FEATURES: ParameterType.locateFeature,
  FILLMODE: ParameterType.fillMode,
  FILLTYPE: ParameterType.fillMode,
  FLOAT: ParameterType.float,
  FULLINTEGERRANGE: ParameterType.integer_range,
  GAMEMODE: ParameterType.gamemode,
  GAMETESTNAME: ParameterType.string,
  GAMETESTTAG: ParameterType.string,
  INT: ParameterType.integer,
  ITEM: ParameterType.item,
  JIGSAWSTRUCTURE: ParameterType.jigsaw,
  KEYWORD: ParameterType.keyword,
  MASKMODE: ParameterType.maskMode,
  MESSAGE_ROOT: ParameterType.message,
  MIRROR: ParameterType.mirror,
  MOBEVENT: ParameterType.event,
  MUSICREPEATMODE: ParameterType.musicRepeatMode,
  OPERATOR: ParameterType.operation,
  PATHCOMMAND: ParameterType.function,
  PERMISSION: ParameterType.permission,
  PERMISSIONLEVEL: ParameterType.permission,
  postfix_l: ParameterType.xp,
  RAWTEXT: ParameterType.string,
  REPLACEMODE: ParameterType.replaceMode,
  RIDERULES: ParameterType.rideRules,
  RVAL: ParameterType.rotation,
  SAVEMODE: ParameterType.saveMode,
  SCOREBOARDOBJECTIVES: ParameterType.objective,
  SELECTION: ParameterType.selector,
  STRUCTUREANIMATIONMODE: ParameterType.structureAnimationMode,
  STRUCTUREFEATURE: ParameterType.structure,
  STRUCTURESAVEMODE: ParameterType.saveMode,
  TAGVALUES: ParameterType.tag,
  TITLERAWSET: ParameterType.jsonRawText,
  UNLOCKABLERECIPEVALUES: ParameterType.recipe,
  VAL: ParameterType.float,
  WILDCARDINT: ParameterType.integer,
};

const keyWordReplace: Record<string, string> = {
  '3PSERVEROFFERLIST': 'server',
  ADD: 'push',
  ADDINFINITEEFFECT: 'infinite',
  ADDTICKINGAREATYPE: 'circle',
  AIMASSISTACTIONCLEAR: 'clear',
  AIMASSISTACTIONSET: 'set',
  ALLDIMENSIONS: 'all-dimensions',
  BLOCKEQUIPMENTSLOT: 'slot.container',
  BOOLSETTINGNAME: 'allow-cheats',
  CAMERASHAKEACTIONADD: 'add',
  CAMERASHAKEACTIONSTOP: 'stop',
  CIRCLEAREA: 'circle',
  CLEAR: 'clear',
  CLEAREFFECTS: 'clear',
  COLOR: 'color',
  DAMAGEORIGINACTOR: 'entity',
  DEFAULT: 'default',
  DIALOGUECHANGEACTION: 'change',
  DIALOGUEOPENACTION: 'open',
  DIFFICULTYSETTINGNAME: 'difficulty',
  EASE: 'ease',
  ENTITY_OFFSET: 'entity_offset',
  EVENTENTITYACTION: 'entity',
  FACING: 'facing',
  FADE: 'fade',
  FUNCTIONNAME: 'function',
  GAMETESTMODECLEARALL: 'clearall',
  GAMETESTMODECREATETEST: 'create',
  GAMETESTMODERUN: 'run',
  GAMETESTMODERUNSET: 'runset',
  GAMETESTMODERUNSETUNTILFAIL: 'runsetuntilfail',
  GAMETESTMODERUNTHIS: 'runthis',
  GAMETESTMODESHOWPOSITION: 'pos',
  GAMETESTRUNNEARBYTESTS: 'runthese',
  GAMETESTSTOPTESTS: 'stopall',
  GIVE: 'give',
  LOCATESUBCOMMANDBIOME: 'biome',
  LOCATESUBCOMMANDSTRUCTURE: 'structure',
  MASKMODEFILTERED: 'filtered',
  MUSICPLAYACTION: 'play',
  MUSICQUEUEACTION: 'queue',
  MUSICSTOPACTION: 'stop',
  MUSICVOLUMEACTION: 'volume',
  OPTION_ALIGN: 'align',
  OPTION_ANCHORED: 'anchored',
  OPTION_AS: 'as',
  OPTION_AT: 'at',
  OPTION_CONDITION_BLOCK: 'block',
  OPTION_CONDITION_BLOCKS: 'blocks',
  OPTION_CONDITION_ENTITY: 'entity',
  OPTION_CONDITION_SCORE: 'score',
  OPTION_ENTITY: 'entity',
  OPTION_FACING: 'facing',
  OPTION_IN: 'in',
  OPTION_POSITIONED: 'positioned',
  OPTION_QUERY: 'query',
  OPTION_ROTATED: 'rotated',
  OPTION_RUN: 'run',
  OPTION_SET: 'set',
  PLACEFEATUREACTION: 'feature',
  PLACEFEATURERULEACTION: 'featurerule',
  PLACEJIGSAWACTION: 'jigsaw',
  PLACESTRUCTUREACTION: 'structure',
  POS: 'pos',
  REMOVE_TARGET: 'remove_target',
  REPLACE: 'replace',
  REPLACEITEMBLOCK: 'block',
  REPLACEITEMENTITY: 'entity',
  REQUESTACTIONADD: 'add',
  REQUESTACTIONCLEAR: 'clear',
  RIDEMODEEVICT: 'evict_riders',
  RIDEMODESTART: 'start_riding',
  RIDEMODESTOP: 'stop_riding',
  RIDEMODESUMMONRIDE: 'summon_ride',
  RIDEMODESUMMONRIDER: 'summon_rider',
  ROT: 'rot',
  SCHEDULEACTIONCLEAR: 'clear',
  SCHEDULEACTIONDELAY: 'delay',
  SCHEDULEACTIONONAREALOADED: 'on_area_loaded',
  SCOREBOARDADDACTION: 'add',
  SCOREBOARDCRITERIA: 'dummy',
  SCOREBOARDDISPLAYSLOTNONSORTABLE: 'belowname',
  SCOREBOARDLISTACTION: 'list',
  SCOREBOARDOBJECTIVESCATEGORY: 'objectives',
  SCOREBOARDOPERATIONACTION: 'operation',
  SCOREBOARDPLAYERSCATEGORY: 'players',
  SCOREBOARDRANDOMACTION: 'random',
  SCOREBOARDREMOVEACTION: 'remove',
  SCOREBOARDRESETACTION: 'reset',
  SCOREBOARDSETDISPLAYACTION: 'setdisplay',
  SCOREBOARDTESTACTION: 'test',
  SCORERANGEMODE: 'matches',
  SCRIPTDEBUGGERCLOSE: 'close',
  SCRIPTDEBUGGERCONNECT: 'connect',
  SCRIPTDEBUGGERLISTEN: 'listen',
  SCRIPTDEBUGMODEDEBUGGER: 'debugger',
  SCRIPTDEBUGMODEDIAGNOSTICS: 'diagnostics',
  SCRIPTDEBUGMODEPROFILER: 'profiler',
  SCRIPTDIAGNOSTICSSTARTCAPTURE: 'startcapture',
  SCRIPTDIAGNOSTICSSTOPCAPTURE: 'stopcapture',
  SCRIPTPROFILERSTART: 'start',
  SCRIPTPROFILERSTOP: 'stop',
  SET: 'set',
  SOURCEKILL: 'kill',
  SOURCELOOT: 'loot',
  SOURCEMINE: 'mine',
  STRUCTUREDELETEACTION: 'delete',
  STRUCTURELOADACTION: 'load',
  STRUCTURESAVEACTION: 'save',
  SUBCOMMANDEXPORT: 'export',
  TAGLISTACTION: 'list',
  TAKE: 'take',
  TARGET_CENTER_OFFSET: 'target_center_offset',
  TARGET_ENTITY: 'target_entity',
  TARGETBLOCK: 'block',
  TARGETENTITY: 'entity',
  TARGETGIVE: 'give',
  TARGETINSERT: 'insert',
  TARGETREPLACE: 'replace',
  TARGETSPAWN: 'spawn',
  TELEPORTFACING: 'facing',
  TICKINGAREA: 'tickingarea',
  TICKINGAREAMODEADD: 'add',
  TICKINGAREAMODELIST: 'list',
  TICKINGAREAMODEPRELOAD: 'preload',
  TICKINGAREAMODEREMOVE: 'remove',
  TICKINGAREAMODEREMOVEALL: 'remove_all',
  TICKINGAREANAME: 'tickingarea',
  TIME: 'time',
  TIMEMODEADD: 'add',
  TIMEMODEQUERY: 'query',
  TIMEMODESET: 'set',
  TITLECLEAR: 'clear',
  TITLERAWCLEAR: 'clear',
  TITLERAWRESET: 'reset',
  TITLERAWTIMES: 'times',
  TITLERESET: 'reset',
  TITLETIMES: 'times',
  VIEW_OFFSET: 'view_offset',
  WEATHERQUERY: 'query',
};
