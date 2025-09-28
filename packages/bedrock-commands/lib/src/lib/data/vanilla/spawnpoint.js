"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnpoint = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The spawnpoint command */
exports.spawnpoint = [
    {
        name: "spawnpoint",
        documentation: "Sets the spawn point for a player.",
        permission_level: 1,
        parameters: [
            { text: "spawnpoint", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
            { text: "spawnPos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos z", type: parameter_type_1.ParameterType.coordinate, required: false },
        ],
    },
];
//# sourceMappingURL=spawnpoint.js.map