"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandData = void 0;
const ability_1 = require("./edu/ability");
const classroommode_1 = require("./edu/classroommode");
const code_1 = require("./edu/code");
const immutableworld_1 = require("./edu/immutableworld");
const aimassist_1 = require("./vanilla/aimassist");
const allowlist_1 = require("./vanilla/allowlist");
const alwaysday_1 = require("./vanilla/alwaysday");
const camera_1 = require("./vanilla/camera");
const camerashake_1 = require("./vanilla/camerashake");
const changesetting_1 = require("./vanilla/changesetting");
const clear_1 = require("./vanilla/clear");
const clearspawnpoint_1 = require("./vanilla/clearspawnpoint");
const clone_1 = require("./vanilla/clone");
const damage_1 = require("./vanilla/damage");
const daylock_1 = require("./vanilla/daylock");
const deop_1 = require("./vanilla/deop");
const dialogue_1 = require("./vanilla/dialogue");
const difficulty_1 = require("./vanilla/difficulty");
const effect_1 = require("./vanilla/effect");
const enchant_1 = require("./vanilla/enchant");
const event_1 = require("./vanilla/event");
const execute_1 = require("./vanilla/execute");
const fill_1 = require("./vanilla/fill");
const fog_1 = require("./vanilla/fog");
const function_1 = require("./vanilla/function");
const gamemode_1 = require("./vanilla/gamemode");
const gamerule_1 = require("./vanilla/gamerule");
const gametest_1 = require("./vanilla/gametest");
const give_1 = require("./vanilla/give");
const help_1 = require("./vanilla/help");
const hud_1 = require("./vanilla/hud");
const inputpermission_1 = require("./vanilla/inputpermission");
const kick_1 = require("./vanilla/kick");
const kill_1 = require("./vanilla/kill");
const locate_1 = require("./vanilla/locate");
const loot_1 = require("./vanilla/loot");
const me_1 = require("./vanilla/me");
const mobevent_1 = require("./vanilla/mobevent");
const msg_1 = require("./vanilla/msg");
const music_1 = require("./vanilla/music");
const op_1 = require("./vanilla/op");
const particle_1 = require("./vanilla/particle");
const permission_1 = require("./vanilla/permission");
const place_1 = require("./vanilla/place");
const playanimation_1 = require("./vanilla/playanimation");
const playsound_1 = require("./vanilla/playsound");
const recipe_1 = require("./vanilla/recipe");
const replaceitem_1 = require("./vanilla/replaceitem");
const ride_1 = require("./vanilla/ride");
const say_1 = require("./vanilla/say");
const schedule_1 = require("./vanilla/schedule");
const scoreboard_1 = require("./vanilla/scoreboard");
const script_1 = require("./vanilla/script");
const scriptevent_1 = require("./vanilla/scriptevent");
const setblock_1 = require("./vanilla/setblock");
const setmaxplayers_1 = require("./vanilla/setmaxplayers");
const setworldspawn_1 = require("./vanilla/setworldspawn");
const spawnpoint_1 = require("./vanilla/spawnpoint");
const spreadplayers_1 = require("./vanilla/spreadplayers");
const stopsound_1 = require("./vanilla/stopsound");
const structure_1 = require("./vanilla/structure");
const summon_1 = require("./vanilla/summon");
const tag_1 = require("./vanilla/tag");
const teleport_1 = require("./vanilla/teleport");
const tell_1 = require("./vanilla/tell");
const tellraw_1 = require("./vanilla/tellraw");
const testfor_1 = require("./vanilla/testfor");
const testforblock_1 = require("./vanilla/testforblock");
const testforblocks_1 = require("./vanilla/testforblocks");
const tickingarea_1 = require("./vanilla/tickingarea");
const time_1 = require("./vanilla/time");
const title_1 = require("./vanilla/title");
const titleraw_1 = require("./vanilla/titleraw");
const toggledownfall_1 = require("./vanilla/toggledownfall");
const tp_1 = require("./vanilla/tp");
const w_1 = require("./vanilla/w");
const weather_1 = require("./vanilla/weather");
const whitelist_1 = require("./vanilla/whitelist");
const xp_1 = require("./vanilla/xp");
const subcommands_1 = require("./vanilla/execute/subcommands");
/** The minecraft command data set */
var CommandData;
(function (CommandData) {
    /** The edu command data set */
    CommandData.Edu = {
        ability: ability_1.ability,
        classroommode: classroommode_1.classroommode,
        code: code_1.code,
        gamerule: gamerule_1.gamerule,
        immutableworld: immutableworld_1.immutableworld,
    };
    /** The vanilla command data set */
    CommandData.Vanilla = {
        aimassist: aimassist_1.aimassist,
        allowlist: allowlist_1.allowlist,
        alwaysday: alwaysday_1.alwaysday,
        camera: camera_1.camera,
        camerashake: camerashake_1.camerashake,
        changesetting: changesetting_1.changesetting,
        clear: clear_1.clear,
        clearspawnpoint: clearspawnpoint_1.clearspawnpoint,
        clone: clone_1.clone,
        damage: damage_1.damage,
        daylock: daylock_1.daylock,
        deop: deop_1.deop,
        dialogue: dialogue_1.dialogue,
        difficulty: difficulty_1.difficulty,
        effect: effect_1.effect,
        enchant: enchant_1.enchant,
        event: event_1.event,
        execute: execute_1.execute,
        fill: fill_1.fill,
        fog: fog_1.fog,
        function: function_1.Function,
        gamemode: gamemode_1.gamemode,
        gamerule: gamerule_1.gamerule,
        gametest: gametest_1.gametest,
        give: give_1.give,
        help: help_1.help,
        hud: hud_1.hud,
        inputpermission: inputpermission_1.inputpermission,
        kick: kick_1.kick,
        kill: kill_1.kill,
        locate: locate_1.locate,
        loot: loot_1.loot,
        me: me_1.me,
        mobevent: mobevent_1.mobevent,
        msg: msg_1.msg,
        music: music_1.music,
        op: op_1.op,
        particle: particle_1.particle,
        permission: permission_1.permission,
        place: place_1.place,
        playanimation: playanimation_1.playanimation,
        playsound: playsound_1.playsound,
        recipe: recipe_1.recipe,
        replaceitem: replaceitem_1.replaceitem,
        ride: ride_1.ride,
        say: say_1.say,
        schedule: schedule_1.schedule,
        scoreboard: scoreboard_1.scoreboard,
        script: script_1.script,
        scriptevent: scriptevent_1.scriptevent,
        setblock: setblock_1.setblock,
        setmaxplayers: setmaxplayers_1.setmaxplayers,
        setworldspawn: setworldspawn_1.setworldspawn,
        spawnpoint: spawnpoint_1.spawnpoint,
        spreadplayers: spreadplayers_1.spreadplayers,
        stopsound: stopsound_1.stopsound,
        structure: structure_1.structure,
        summon: summon_1.summon,
        tag: tag_1.tag,
        teleport: teleport_1.teleport,
        tell: tell_1.tell,
        tellraw: tellraw_1.tellraw,
        testfor: testfor_1.testfor,
        testforblock: testforblock_1.testforblock,
        testforblocks: testforblocks_1.testforblocks,
        tickingarea: tickingarea_1.tickingarea,
        time: time_1.time,
        title: title_1.title,
        titleraw: titleraw_1.titleraw,
        toggledownfall: toggledownfall_1.toggledownfall,
        tp: tp_1.tp,
        w: w_1.w,
        weather: weather_1.weather,
        whitelist: whitelist_1.whitelist,
        xp: xp_1.xp,
    };
    /** The execute sub command data set */
    CommandData.ExecuteSubcommands = subcommands_1.executeSubCommands;
    /** All the vanilla commands */
    CommandData.VanillaCommands = Object.keys(CommandData.Vanilla);
    /** All the edu commands */
    CommandData.EduCommands = Object.keys(CommandData.Edu);
})(CommandData || (exports.CommandData = CommandData = {}));
//# sourceMappingURL=command-data.js.map