"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whitelist = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The whitelist command */
exports.whitelist = [
    {
        name: "whitelist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "whitelist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
    {
        name: "whitelist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "whitelist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "list", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
    {
        name: "whitelist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "whitelist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "off", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
    {
        name: "whitelist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "whitelist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "on", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
    {
        name: "whitelist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "whitelist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "reload", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
    {
        name: "whitelist",
        documentation: "Manages the server allowlist.",
        permission_level: 4,
        parameters: [
            { text: "whitelist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "remove", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
];
//# sourceMappingURL=whitelist.js.map