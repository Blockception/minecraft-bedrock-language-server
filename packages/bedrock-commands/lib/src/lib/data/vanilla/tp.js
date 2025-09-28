"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tp = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The tp command */
exports.tp = [
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "destination", type: parameter_type_1.ParameterType.selector, required: true },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "facing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "look at entity", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "facing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "lookAtPosition x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "lookAtPosition y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "lookAtPosition z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "y rot", type: parameter_type_1.ParameterType.rotation, required: false },
            { text: "x rot", type: parameter_type_1.ParameterType.rotation, required: false },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "destination", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "facing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "look at entity", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "facing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "lookAtPosition x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "lookAtPosition y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "lookAtPosition z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tp",
        documentation: "Teleports entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "tp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "y rot", type: parameter_type_1.ParameterType.rotation, required: false },
            { text: "x rot", type: parameter_type_1.ParameterType.rotation, required: false },
            { text: "check for blocks", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=tp.js.map