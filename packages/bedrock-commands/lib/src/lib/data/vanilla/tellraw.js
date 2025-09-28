"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tellraw = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The tellraw command */
exports.tellraw = [
    {
        name: "tellraw",
        documentation: "Sends a JSON message to players.",
        permission_level: 1,
        parameters: [
            { text: "tellraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "raw json message", type: parameter_type_1.ParameterType.jsonRawText, required: true },
        ],
    },
];
//# sourceMappingURL=tellraw.js.map