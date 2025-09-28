"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The help command */
exports.help = [
    {
        name: "help",
        documentation: "Provides help/list of commands.",
        permission_level: 0,
        parameters: [
            { text: "help", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "command", type: parameter_type_1.ParameterType.command, required: false },
        ],
    },
    {
        name: "help",
        documentation: "Provides help/list of commands.",
        permission_level: 0,
        parameters: [
            { text: "help", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "command", type: parameter_type_1.ParameterType.command, required: false },
        ],
    },
    {
        name: "help",
        documentation: "Provides help/list of commands.",
        permission_level: 0,
        parameters: [
            { text: "help", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "page", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
    {
        name: "help",
        documentation: "Provides help/list of commands.",
        permission_level: 0,
        parameters: [
            { text: "help", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "page", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
];
//# sourceMappingURL=help.js.map