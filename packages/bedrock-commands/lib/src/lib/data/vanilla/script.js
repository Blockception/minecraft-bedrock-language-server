"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.script = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The script command */
exports.script = [
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "debugger", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "close", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "debugger", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "connect", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "host", type: parameter_type_1.ParameterType.string, required: false },
            { text: "port", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "debugger", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "listen", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "port", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "diagnostics", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "startcapture", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "diagnostics", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "stopcapture", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "profiler", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "start", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "script",
        documentation: "Script debugger commands.",
        permission_level: 2,
        parameters: [
            { text: "script", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "profiler", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "stop", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=script.js.map