"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The time command */
exports.time = [
    {
        name: "time",
        documentation: "Add to the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "query", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "day", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "query", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "daytime", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "query", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "gametime", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "day", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "midnight", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "night", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "noon", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "sunrise", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "time",
        documentation: "Changes or queries the world's game time.",
        permission_level: 1,
        parameters: [
            { text: "time", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "sunset", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=time.js.map