"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopsound = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The stopsound command */
exports.stopsound = [
    {
        name: "stopsound",
        documentation: "Stops all playing sounds on the given players.",
        permission_level: 1,
        parameters: [
            { text: "stopsound", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "sound", type: parameter_type_1.ParameterType.sound, required: false },
        ],
    },
];
//# sourceMappingURL=stopsound.js.map