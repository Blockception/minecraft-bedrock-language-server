import { CommandContainer } from './command-container';

import { ability } from './edu/ability';
import { classroommode } from './edu/classroommode';
import { code } from './edu/code';
import { immutableworld } from './edu/immutableworld';

import { aimassist } from './vanilla/aimassist';
import { allowlist } from './vanilla/allowlist';
import { alwaysday } from './vanilla/alwaysday';
import { camera } from './vanilla/camera';
import { camerashake } from './vanilla/camerashake';
import { changesetting } from './vanilla/changesetting';
import { clear } from './vanilla/clear';
import { clearspawnpoint } from './vanilla/clearspawnpoint';
import { clone } from './vanilla/clone';
import { damage } from './vanilla/damage';
import { daylock } from './vanilla/daylock';
import { deop } from './vanilla/deop';
import { dialogue } from './vanilla/dialogue';
import { difficulty } from './vanilla/difficulty';
import { effect } from './vanilla/effect';
import { enchant } from './vanilla/enchant';
import { event } from './vanilla/event';
import { execute } from './vanilla/execute';
import { fill } from './vanilla/fill';
import { fog } from './vanilla/fog';
import { Function } from './vanilla/function';
import { gamemode } from './vanilla/gamemode';
import { gamerule } from './vanilla/gamerule';
import { gametest } from './vanilla/gametest';
import { give } from './vanilla/give';
import { help } from './vanilla/help';
import { hud } from './vanilla/hud';
import { inputpermission } from './vanilla/inputpermission';
import { kick } from './vanilla/kick';
import { kill } from './vanilla/kill';
import { locate } from './vanilla/locate';
import { loot } from './vanilla/loot';
import { me } from './vanilla/me';
import { mobevent } from './vanilla/mobevent';
import { msg } from './vanilla/msg';
import { music } from './vanilla/music';
import { op } from './vanilla/op';
import { particle } from './vanilla/particle';
import { permission } from './vanilla/permission';
import { place } from './vanilla/place';
import { playanimation } from './vanilla/playanimation';
import { playsound } from './vanilla/playsound';
import { recipe } from './vanilla/recipe';
import { replaceitem } from './vanilla/replaceitem';
import { ride } from './vanilla/ride';
import { say } from './vanilla/say';
import { schedule } from './vanilla/schedule';
import { scoreboard } from './vanilla/scoreboard';
import { script } from './vanilla/script';
import { scriptevent } from './vanilla/scriptevent';
import { setblock } from './vanilla/setblock';
import { setmaxplayers } from './vanilla/setmaxplayers';
import { setworldspawn } from './vanilla/setworldspawn';
import { spawnpoint } from './vanilla/spawnpoint';
import { spreadplayers } from './vanilla/spreadplayers';
import { stopsound } from './vanilla/stopsound';
import { structure } from './vanilla/structure';
import { summon } from './vanilla/summon';
import { tag } from './vanilla/tag';
import { teleport } from './vanilla/teleport';
import { tell } from './vanilla/tell';
import { tellraw } from './vanilla/tellraw';
import { testfor } from './vanilla/testfor';
import { testforblock } from './vanilla/testforblock';
import { testforblocks } from './vanilla/testforblocks';
import { tickingarea } from './vanilla/tickingarea';
import { time } from './vanilla/time';
import { title } from './vanilla/title';
import { titleraw } from './vanilla/titleraw';
import { toggledownfall } from './vanilla/toggledownfall';
import { tp } from './vanilla/tp';
import { w } from './vanilla/w';
import { weather } from './vanilla/weather';
import { whitelist } from './vanilla/whitelist';
import { xp } from './vanilla/xp';

import { executeSubCommands } from './vanilla/execute/subcommands';

/** The minecraft command data set */
export namespace CommandData {
  /** The edu command data set */
  export const Edu: CommandContainer = {
    ability,
    classroommode,
    code,
    gamerule,
    immutableworld,
  };

  /** The vanilla command data set */
  export const Vanilla: CommandContainer = {
    aimassist,
    allowlist,
    alwaysday,
    camera,
    camerashake,
    changesetting,
    clear,
    clearspawnpoint,
    clone,
    damage,
    daylock,
    deop,
    dialogue,
    difficulty,
    effect,
    enchant,
    event,
    execute,
    fill,
    fog,
    function: Function,
    gamemode,
    gamerule,
    gametest,
    give,
    help,
    hud,
    inputpermission,
    kick,
    kill,
    locate,
    loot,
    me,
    mobevent,
    msg,
    music,
    op,
    particle,
    permission,
    place,
    playanimation,
    playsound,
    recipe,
    replaceitem,
    ride,
    say,
    schedule,
    scoreboard,
    script,
    scriptevent,
    setblock,
    setmaxplayers,
    setworldspawn,
    spawnpoint,
    spreadplayers,
    stopsound,
    structure,
    summon,
    tag,
    teleport,
    tell,
    tellraw,
    testfor,
    testforblock,
    testforblocks,
    tickingarea,
    time,
    title,
    titleraw,
    toggledownfall,
    tp,
    w,
    weather,
    whitelist,
    xp,
  };

  /** The execute sub command data set */
  export const ExecuteSubcommands = executeSubCommands;

  /** All the vanilla commands */
  export const VanillaCommands = Object.keys(Vanilla);
  /** All the edu commands */
  export const EduCommands = Object.keys(Edu);
}
