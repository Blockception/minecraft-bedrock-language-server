"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputpermission = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The inputpermission command */
exports.inputpermission = [
    {
        name: "inputpermission",
        documentation: "Sets whether or not a player's input can affect their character.",
        permission_level: 1,
        parameters: [
            { text: "inputpermission", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "query", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "targets", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "permission", type: parameter_type_1.ParameterType.permission, required: true },
            { text: "disabled", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "inputpermission",
        documentation: "Sets whether or not a player's input can affect their character.",
        permission_level: 1,
        parameters: [
            { text: "inputpermission", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "query", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "targets", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "permission", type: parameter_type_1.ParameterType.permission, required: true },
            { text: "enabled", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "inputpermission",
        documentation: "Sets whether or not a player's input can affect their character.",
        permission_level: 1,
        parameters: [
            { text: "inputpermission", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "targets", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "permission", type: parameter_type_1.ParameterType.permission, required: true },
            { text: "disabled", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "inputpermission",
        documentation: "Sets whether or not a player's input can affect their character.",
        permission_level: 1,
        parameters: [
            { text: "inputpermission", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "targets", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "permission", type: parameter_type_1.ParameterType.permission, required: true },
            { text: "enabled", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=inputpermission.js.map