"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowlist = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The allowlist command */
exports.allowlist = [
    {
        name: "allowlist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "allowlist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "allowlist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "allowlist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "list", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "allowlist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "allowlist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "off", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "allowlist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "allowlist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "on", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "allowlist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "allowlist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "reload", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "allowlist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "allowlist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "remove", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
];
//# sourceMappingURL=allowlist.js.map