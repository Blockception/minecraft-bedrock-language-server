"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playsound = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The playsound command */
exports.playsound = [
    {
        name: "playsound",
        documentation: "Plays a sound.",
        permission_level: 1,
        parameters: [
            { text: "playsound", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "sound", type: parameter_type_1.ParameterType.sound, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "volume", type: parameter_type_1.ParameterType.float, required: false },
            { text: "pitch", type: parameter_type_1.ParameterType.float, required: false },
            { text: "minimum volume", type: parameter_type_1.ParameterType.float, required: false },
        ],
    },
];
//# sourceMappingURL=playsound.js.map