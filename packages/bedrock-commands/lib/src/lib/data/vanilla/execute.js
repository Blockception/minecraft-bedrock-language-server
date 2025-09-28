"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The execute command */
exports.execute = [
    {
        name: "execute",
        documentation: "Executes another command.",
        permission_level: 1,
        parameters: [
            { text: "execute", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "next", type: parameter_type_1.ParameterType.executeSubcommand, required: true },
        ],
    },
    {
        name: "execute",
        documentation: "Executes another command.",
        permission_level: 1,
        obsolete: {
            code: "minecraft.commands.execute.deprecated",
            message: "This version of the execute command has been deprecated, use the new version instead.",
            format_version: "1.19.50",
        },
        parameters: [
            { text: "execute", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "origin", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "command", type: parameter_type_1.ParameterType.command, required: true },
        ],
    },
    {
        name: "execute",
        documentation: "Executes another command.",
        permission_level: 1,
        obsolete: {
            code: "minecraft.commands.execute.deprecated",
            message: "This version of the execute command has been deprecated, use the new version instead.",
            format_version: "1.19.50",
        },
        parameters: [
            { text: "execute", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "origin", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "detect", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "detect pos x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "detect pos y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "detect pos z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "block", type: parameter_type_1.ParameterType.block, required: true },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "command", type: parameter_type_1.ParameterType.command, required: true },
        ],
    },
];
//# sourceMappingURL=execute.js.map