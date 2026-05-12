"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const parameter_type_js_1 = require("../../../packages/bedrock-commands/src/types/parameter-type.js");
const mutate_js_1 = require("./mutate.js");
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
function convert(data) {
    const result = {};
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
            let i;
            if ((i = a.name.localeCompare(b.name)) != 0)
                return i;
            const m = Math.min(a.parameters.length, b.parameters.length);
            for (let j = 0; j < m; j++) {
                if ((i = a.parameters[j].text.localeCompare(b.parameters[j].text)) != 0)
                    return i;
            }
            return 0;
        });
    }
    return result;
}
function convertCommand(data) {
    (0, mutate_js_1.mutate)(data);
    data.name = data.name === '?' ? 'help' : data.name;
    const result = [];
    data.overloads.forEach((overload) => {
        const base = {
            name: data.name,
            documentation: data.description,
            parameters: [],
            permission_level: data.permission_level,
        };
        result.push(convertC(base, overload));
    });
    data.aliases.forEach((alias) => {
        alias.name = alias.name === '?' ? 'help' : alias.name;
        const base = {
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
function convertC(base, overload) {
    const commandInfo = {
        ...base,
        parameters: [
            {
                text: base.name,
                type: parameter_type_js_1.ParameterType.keyword,
                required: true,
            },
        ],
    };
    overload.params.map((item) => convertParameter(base.name, item, commandInfo.parameters));
    console.log('  command ->', commandInfo.parameters.map((i) => i.text).join(' '));
    return commandInfo;
}
function convertParameter(comm, param, receiver) {
    const name = param.name;
    const required = !param.is_optional;
    switch (param.type.name) {
        case 'POSITION':
        case 'POSITION_FLOAT':
            receiver.push({
                text: name + ' x',
                type: parameter_type_js_1.ParameterType.coordinate,
                required: required,
            }, {
                text: name + ' y',
                type: parameter_type_js_1.ParameterType.coordinate,
                required: required,
            }, {
                text: name + ' z',
                type: parameter_type_js_1.ParameterType.coordinate,
                required: required,
            });
            break;
        case 'ROT':
        case 'ROTATION':
            receiver.push({
                text: name + ' yaw',
                type: parameter_type_js_1.ParameterType.rotation,
                required: required,
            }, {
                text: name + ' pitch',
                type: parameter_type_js_1.ParameterType.rotation,
                required: required,
            });
            break;
        default:
            const b = {
                text: fixName(name),
                type: parameter_type_js_1.ParameterType.unknown,
                required: required,
            };
            if (param.type.name in keyWordReplace) {
                b.text = keyWordReplace[param.type.name];
                b.type = parameter_type_js_1.ParameterType.keyword;
            }
            else {
                b.type = converType(comm, name, param.type.name);
            }
            receiver.push(b);
    }
}
function fixName(name) {
    const n = 'ABCDEFGHIJKLMNOPQRSTUVWYX';
    for (const c of n.split('')) {
        name = name.replaceAll(c, ' ' + c.toLowerCase());
    }
    name = name.replaceAll('_', ' ');
    return name;
}
function converType(comm, name, type) {
    if (type in enumMap) {
        return enumMap[type];
    }
    if (type === 'ID') {
        switch (true) {
            case comm === 'allowlist' && name === 'name':
            case comm === 'aimassist' && name === 'preset id':
            case comm === 'dialogue' && name === 'sceneName':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'fog' && name === 'fogId':
                return parameter_type_js_1.ParameterType.fog;
            case comm === 'fog' && name === 'userProvidedId':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'gametest' && name === 'testName':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'loot' && name === 'loot_table':
                return parameter_type_js_1.ParameterType.lootTable;
            case comm === 'music' && name === 'trackName':
                return parameter_type_js_1.ParameterType.music;
            case comm === 'place' && name === 'jigsawTarget':
                return parameter_type_js_1.ParameterType.jigsaw;
            case comm === 'playanimation' && name === 'animation':
                return parameter_type_js_1.ParameterType.animation;
            case comm === 'particle' && name === 'effect':
                return parameter_type_js_1.ParameterType.particle;
            case comm === 'playanimation' && name === 'stop_expression':
            case comm === 'playanimation' && name === 'next_state':
            case comm === 'playanimation' && name === 'controller':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'playsound' && name === 'sound':
            case comm === 'stopsound' && name === 'sound':
                return parameter_type_js_1.ParameterType.sound;
            case comm === 'scoreboard' && name === 'displayName':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'script' && name === 'host':
            case comm === 'scriptevent' && name === 'name':
            case comm === 'scriptevent' && name === 'messageId':
            case comm === 'scriptevent' && name === 'message':
            case comm === 'structure' && name === 'seed':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'structure' && name === 'name':
                return parameter_type_js_1.ParameterType.structure;
            case comm === 'ride' && name === 'spawnEvent':
            case comm === 'ride' && name === 'nameTag':
            case comm === 'summon' && name === 'nameTag':
            case comm === 'transfer' && name === 'server':
                return parameter_type_js_1.ParameterType.string;
            case comm === 'schedule' && name === 'name':
            case comm === 'tickingarea' && name === 'name':
                return parameter_type_js_1.ParameterType.tickingarea;
            case comm === 'whitelist' && name === 'name':
                return parameter_type_js_1.ParameterType.selector;
        }
    }
    if (type === 'JSON_OBJECT') {
        switch (name) {
            case 'raw json titleText':
            case 'titleText':
            case 'raw json message':
                return parameter_type_js_1.ParameterType.jsonRawText;
            case 'components':
                return parameter_type_js_1.ParameterType.jsonItem;
            default:
        }
    }
    if (type.startsWith('postfix_')) {
        switch (name) {
            case 'time':
                return parameter_type_js_1.ParameterType.time;
            default:
        }
    }
    console.log('unknown type', comm, name, type);
    return parameter_type_js_1.ParameterType.unknown;
}
const enumMap = {
    AIMASSISTTARGETMODE: parameter_type_js_1.ParameterType.keyword,
    BIOME: parameter_type_js_1.ParameterType.biome,
    BLOCK_STATE_ARRAY: parameter_type_js_1.ParameterType.blockStates,
    BLOCK: parameter_type_js_1.ParameterType.block,
    BOOLEAN: parameter_type_js_1.ParameterType.boolean,
    CAMERAPRESETS: parameter_type_js_1.ParameterType.cameraPresets,
    CAMERASHAKETYPE: parameter_type_js_1.ParameterType.cameraShakeType,
    CLONEMODE: parameter_type_js_1.ParameterType.cloneMode,
    CODEBUILDERARGS: parameter_type_js_1.ParameterType.executeSubcommand,
    COMMANDNAME: parameter_type_js_1.ParameterType.command,
    COMPAREOPERATOR: parameter_type_js_1.ParameterType.operation,
    DAMAGECAUSE: parameter_type_js_1.ParameterType.causeType,
    DIFFICULTY: parameter_type_js_1.ParameterType.difficulty,
    DIMENSION: parameter_type_js_1.ParameterType.dimension,
    EFFECT: parameter_type_js_1.ParameterType.effect,
    ENCHANT: parameter_type_js_1.ParameterType.enchant,
    ENTITYEQUIPMENTSLOT: parameter_type_js_1.ParameterType.slotType,
    ENTITYEVENTS: parameter_type_js_1.ParameterType.event,
    ENTITYTYPE: parameter_type_js_1.ParameterType.entity,
    EXECUTECHAINEDOPTION_0: parameter_type_js_1.ParameterType.executeSubcommand,
    EASING: parameter_type_js_1.ParameterType.easing,
    FEATURERULES: parameter_type_js_1.ParameterType.locateFeature,
    FEATURES: parameter_type_js_1.ParameterType.locateFeature,
    FILLMODE: parameter_type_js_1.ParameterType.fillMode,
    FILLTYPE: parameter_type_js_1.ParameterType.fillMode,
    FLOAT: parameter_type_js_1.ParameterType.float,
    FULLINTEGERRANGE: parameter_type_js_1.ParameterType.integer_range,
    GAMEMODE: parameter_type_js_1.ParameterType.gamemode,
    GAMETESTNAME: parameter_type_js_1.ParameterType.string,
    GAMETESTTAG: parameter_type_js_1.ParameterType.string,
    INT: parameter_type_js_1.ParameterType.integer,
    ITEM: parameter_type_js_1.ParameterType.item,
    JIGSAWSTRUCTURE: parameter_type_js_1.ParameterType.jigsaw,
    KEYWORD: parameter_type_js_1.ParameterType.keyword,
    MASKMODE: parameter_type_js_1.ParameterType.maskMode,
    MESSAGE_ROOT: parameter_type_js_1.ParameterType.message,
    MIRROR: parameter_type_js_1.ParameterType.mirror,
    MOBEVENT: parameter_type_js_1.ParameterType.event,
    MUSICREPEATMODE: parameter_type_js_1.ParameterType.musicRepeatMode,
    OPERATOR: parameter_type_js_1.ParameterType.operation,
    PATHCOMMAND: parameter_type_js_1.ParameterType.function,
    PERMISSION: parameter_type_js_1.ParameterType.permission,
    PERMISSIONLEVEL: parameter_type_js_1.ParameterType.permission,
    postfix_l: parameter_type_js_1.ParameterType.xp,
    RAWTEXT: parameter_type_js_1.ParameterType.string,
    REPLACEMODE: parameter_type_js_1.ParameterType.replaceMode,
    RIDERULES: parameter_type_js_1.ParameterType.rideRules,
    RVAL: parameter_type_js_1.ParameterType.rotation,
    SAVEMODE: parameter_type_js_1.ParameterType.saveMode,
    SCOREBOARDOBJECTIVES: parameter_type_js_1.ParameterType.objective,
    SELECTION: parameter_type_js_1.ParameterType.selector,
    STRUCTUREANIMATIONMODE: parameter_type_js_1.ParameterType.structureAnimationMode,
    STRUCTUREFEATURE: parameter_type_js_1.ParameterType.structure,
    STRUCTURESAVEMODE: parameter_type_js_1.ParameterType.saveMode,
    TAGVALUES: parameter_type_js_1.ParameterType.tag,
    TITLERAWSET: parameter_type_js_1.ParameterType.jsonRawText,
    UNLOCKABLERECIPEVALUES: parameter_type_js_1.ParameterType.recipe,
    VAL: parameter_type_js_1.ParameterType.float,
    WILDCARDINT: parameter_type_js_1.ParameterType.integer,
};
const keyWordReplace = {
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
//# sourceMappingURL=convert.js.map