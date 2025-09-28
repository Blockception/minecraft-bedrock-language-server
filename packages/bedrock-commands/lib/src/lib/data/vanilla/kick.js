"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kick = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The kick command */
exports.kick = [
    {
        name: "kick",
        documentation: "Kicks a player from the server.",
        permission_level: 1,
        parameters: [
            { text: "kick", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reason", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=kick.js.map