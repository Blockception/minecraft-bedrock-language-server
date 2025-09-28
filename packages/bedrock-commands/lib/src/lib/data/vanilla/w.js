"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The w command */
exports.w = [
    {
        name: "w",
        documentation: "Sends a private message to one or more players.",
        permission_level: 0,
        parameters: [
            { text: "w", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "message", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=w.js.map