"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The title command */
exports.title = [
    {
        name: "title",
        documentation: "Controls screen titles.",
        permission_level: 1,
        parameters: [
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "actionbar", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "title text", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
    {
        name: "title",
        documentation: "Controls screen titles.",
        permission_level: 1,
        parameters: [
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "clear", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "title",
        documentation: "Controls screen titles.",
        permission_level: 1,
        parameters: [
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "title",
        documentation: "Controls screen titles.",
        permission_level: 1,
        parameters: [
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "subtitle", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "title text", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
    {
        name: "title",
        documentation: "Controls screen titles.",
        permission_level: 1,
        parameters: [
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "times", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "fade in", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "stay", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "fade out", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
    {
        name: "title",
        documentation: "Controls screen titles.",
        permission_level: 1,
        parameters: [
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "title", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "title text", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=title.js.map