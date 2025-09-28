"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleraw = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The titleraw command */
exports.titleraw = [
    {
        name: "titleraw",
        documentation: "Controls screen titles with JSON messages.",
        permission_level: 1,
        parameters: [
            { text: "titleraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "actionbar", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "raw json title text", type: parameter_type_1.ParameterType.jsonRawText, required: true },
        ],
    },
    {
        name: "titleraw",
        documentation: "Controls screen titles with JSON messages.",
        permission_level: 1,
        parameters: [
            { text: "titleraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "clear", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "titleraw",
        documentation: "Controls screen titles with JSON messages.",
        permission_level: 1,
        parameters: [
            { text: "titleraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "titleraw",
        documentation: "Controls screen titles with JSON messages.",
        permission_level: 1,
        parameters: [
            { text: "titleraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "subtitle", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "raw json title text", type: parameter_type_1.ParameterType.jsonRawText, required: true },
        ],
    },
    {
        name: "titleraw",
        documentation: "Controls screen titles with JSON messages.",
        permission_level: 1,
        parameters: [
            { text: "titleraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "times", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "fade in", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "stay", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "fade out", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
    {
        name: "titleraw",
        documentation: "Controls screen titles with JSON messages.",
        permission_level: 1,
        parameters: [
            { text: "titleraw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "raw json title text", type: parameter_type_1.ParameterType.jsonRawText, required: true },
        ],
    },
];
//# sourceMappingURL=titleraw.js.map