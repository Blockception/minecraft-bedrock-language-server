import { Command, CommandOverload, CommandParameter } from './minecraft-data';

const mutateData: Array<[string, string[]]> = [
  ['ACTORLOCATION', ['eyes', 'feet']],
  ['AIMASSISTTARGETMODE', ['distance', 'angle']],
  ['ALLOWLISTACTION', ['add', 'remove', 'list', 'reload', 'on', 'off']],
  ['BLOCKSSCANMODE', ['masked', 'all']],
  [
    'BOOLGAMERULE',
    [
      'commandblockoutput',
      'dodaylightcycle',
      'doentitydrops',
      'dofiretick',
      'recipesunlock',
      'dolimitedcrafting',
      'domobloot',
      'domobspawning',
      'dotiledrops',
      'doweathercycle',
      'drowningdamage',
      'falldamage',
      'firedamage',
      'keepinventory',
      'mobgriefing',
      'pvp',
      'showcoordinates',
      'showdaysplayed',
      'naturalregeneration',
      'tntexplodes',
      'sendcommandfeedback',
      'doinsomnia',
      'commandblocksenabled',
      'doimmediaterespawn',
      'showdeathmessages',
      'showtags',
      'freezedamage',
      'respawnblocksexplode',
      'showbordereffect',
      'showrecipemessages',
      'projectilescanbreakblocks',
      'tntexplosiondropdecay',
    ],
  ],
  ['DELAYMODE', ['replace', 'append']],
  ['DELETE', ['pop', 'remove']],
  ['EXPORTTYPES', ['project', 'template', 'world']],
  ['FILLTYPE', ['until_full', 'if_group_fits']],
  [
    'HUDELEMENT',
    [
      'hunger',
      'all',
      'paperdoll',
      'armor',
      'tooltips',
      'touch_controls',
      'crosshair',
      'hotbar',
      'health',
      'progress_bar',
      'air_bubbles',
      'horse_health',
      'status_effects',
      'item_text',
    ],
  ],
  ['HUDVISIBILITY', ['hide', 'reset']],
  [
    'INTGAMERULE',
    ['maxcommandchainlength', 'randomtickspeed', 'functioncommandlimit', 'spawnradius', 'playerssleepingpercentage'],
  ],
  ['OPTION_IF_UNLESS', ['if', 'unless']],
  ['PERMISSIONSACTION', ['list', 'reload']],
  ['REDIRECTLOCATION', ['marketplace', 'character']],
  ['RIDERULES', ['no_ride_change', 'reassign_rides', 'skip_riders']],
  ['SCOREBOARDDISPLAYSLOTSORTABLE', ['list', 'sidebar']],
  ['SCOREBOARDPLAYERSNUMACTION', ['set', 'add', 'remove']],
  ['SCOREBOARDSORTORDER', ['ascending', 'descending']],
  ['SETBLOCKMODE', ['replace', 'destroy', 'keep']],
  ['STATE', ['enabled', 'disabled']],
  ['TAGCHANGEACTION', ['add', 'remove']],
  ['TELEPORTRULES', ['teleport_rider', 'teleport_ride']],
  ['TESTFORBLOCKSMODE', ['masked', 'all']],
  ['TIMEQUERY', ['daytime', 'gametime', 'day']],
  ['TIMESPEC', ['day', 'sunrise', 'noon', 'sunset', 'night', 'midnight']],
  ['TITLERAWSET', ['title', 'subtitle', 'actionbar']],
  ['TITLESET', ['title', 'subtitle', 'actionbar']],
  ['WEATHERTYPE', ['clear', 'rain', 'thunder']],
];

const mutateDataP: Array<[(value: CommandParameter) => boolean, Partial<CommandParameter>[]]> = [
  [
    (item) => item.type.name === 'TOOL',
    [
      {
        name: 'mainhand',
        type: { name: 'KEYWORD' },
      },
      {
        name: 'offhand',
        type: { name: 'KEYWORD' },
      },
      {
        name: 'tool',
        type: { name: 'ITEM' },
      },
    ],
  ],
  [
    (item) => item.name === 'axes' && item.type.name === 'ID',
    [
      {
        name: 'x',
        type: { name: 'KEYWORD' },
      },
      {
        name: 'y',
        type: { name: 'KEYWORD' },
      },
      {
        name: 'z',
        type: { name: 'KEYWORD' },
      },
    ],
  ],
  [
    (item) => item.type.name === 'ENTITY',
    [
      {
        name: 'target',
        type: { name: 'KEYWORD' },
      },
      {
        name: 'target',
        type: { name: 'ENTITY' },
      },
    ],
  ],
];

interface Deletable {
  delete?: true;
}

export function mutate(data: Command) {
  for (const [orignal, others] of mutateData) {
    const overloads: Array<CommandOverload> = [];

    for (let i = 0; i < data.overloads.length; i++) {
      const overload = data.overloads[i];
      const result = mutateOverloadWith(overload, orignal, others);
      overloads.push(...result);
    }

    data.overloads = overloads;
  }

  for (const [predicate, others] of mutateDataP) {
    const overloads: Array<CommandOverload> = [];

    for (let i = 0; i < data.overloads.length; i++) {
      const overload = data.overloads[i];
      const result = mutateOverloadWithP(overload, predicate, others);
      overloads.push(...result);
    }

    data.overloads = overloads;
  }
}

function mutateOverloadWith(data: CommandOverload, orignal: string, others: string[]): CommandOverload[] {
  const i = data.params.findIndex((p) => p.type.name === orignal);
  if (i === -1) {
    return [data];
  }

  const result: CommandOverload[] = [];

  for (const o of others) {
    const newData: CommandOverload = {
      ...data,
      params: [...data.params],
    };
    newData.params[i] = {
      name: o,
      type: { name: 'KEYWORD' },
      is_optional: data.params[i].is_optional,
    };
    result.push(newData);
  }

  return result;
}

function mutateOverloadWithP(
  data: CommandOverload & Deletable,
  predicate: (CommandParameter) => boolean,
  others: Partial<CommandParameter>[],
) {
  const i = data.params.findIndex(predicate);
  if (i === -1) {
    return [data];
  }

  const result: CommandOverload[] = [];
  data.delete = true;

  for (const o of others) {
    const newData: CommandOverload = {
      ...data,
      params: [...data.params],
    };
    newData.params[i] = {
      ...data.params[i],
      ...o,
    };
    result.push(newData);
  }

  return result;
}
