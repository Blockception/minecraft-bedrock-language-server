"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gametest = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The gametest command */
exports.gametest = [
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "clearall", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "create", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "test name", type: parameter_type_1.ParameterType.string, required: true },
            { text: "width", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "height", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "depth", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "pos", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "run", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "test name", type: parameter_type_1.ParameterType.string, required: true },
            { text: "rotation steps", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "run", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "test name", type: parameter_type_1.ParameterType.string, required: true },
            { text: "stop on failure", type: parameter_type_1.ParameterType.boolean, required: true },
            { text: "repeat count", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "rotation steps", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "runset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "tag", type: parameter_type_1.ParameterType.string, required: false },
            { text: "rotation steps", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "runsetuntilfail", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "tag", type: parameter_type_1.ParameterType.string, required: false },
            { text: "rotation steps", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "runthese", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "runthis", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "gametest",
        documentation: "Interacts with gametest.",
        permission_level: 1,
        parameters: [
            { text: "gametest", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "stopall", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=gametest.js.map