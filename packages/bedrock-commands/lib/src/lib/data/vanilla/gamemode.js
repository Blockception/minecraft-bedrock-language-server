"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamemode = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The gamemode command */
exports.gamemode = [
    {
        name: "gamemode",
        documentation: "Sets a player's game mode.",
        permission_level: 1,
        parameters: [
            { text: "gamemode", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "game mode", type: parameter_type_1.ParameterType.gamemode, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
    {
        name: "gamemode",
        documentation: "Sets a player's game mode.",
        permission_level: 1,
        parameters: [
            { text: "gamemode", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "game mode", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
];
//# sourceMappingURL=gamemode.js.map