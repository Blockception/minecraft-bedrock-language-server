"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogue = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The dialogue command */
exports.dialogue = [
    {
        name: "dialogue",
        documentation: "Direct an NPC to use the dialogue provided in a specifically designated scene file.",
        permission_level: 1,
        parameters: [
            { text: "dialogue", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "change", type: parameter_type_1.ParameterType.keyword, required: true },
            {
                text: "npc",
                type: parameter_type_1.ParameterType.selector,
                required: true,
                options: { allowFakePlayers: false, playerOnly: false },
            },
            { text: "scene name", type: parameter_type_1.ParameterType.string, required: true },
            {
                text: "players",
                type: parameter_type_1.ParameterType.selector,
                required: false,
                options: { playerOnly: true, allowFakePlayers: false },
            },
        ],
    },
    {
        name: "dialogue",
        documentation: "Forces to open an NPC dialogue box to the targeted player(s).",
        permission_level: 1,
        parameters: [
            { text: "dialogue", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "open", type: parameter_type_1.ParameterType.keyword, required: true },
            {
                text: "npc",
                type: parameter_type_1.ParameterType.selector,
                required: true,
                options: { allowFakePlayers: false, playerOnly: false },
            },
            {
                text: "player",
                type: parameter_type_1.ParameterType.selector,
                required: true,
                options: { playerOnly: true, allowFakePlayers: false },
            },
            { text: "scene name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
];
//# sourceMappingURL=dialogue.js.map