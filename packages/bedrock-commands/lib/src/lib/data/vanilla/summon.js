"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summon = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The summon command */
exports.summon = [
    {
        name: "summon",
        documentation: "Summons an entity.",
        permission_level: 1,
        parameters: [
            { text: "summon", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: true },
            { text: "spawnPos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos z", type: parameter_type_1.ParameterType.coordinate, required: false },
        ],
    },
    {
        name: "summon",
        documentation: "Summons an entity.",
        permission_level: 1,
        parameters: [
            { text: "summon", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "spawnPos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos z", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "facing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "look at entity", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "spawn event", type: parameter_type_1.ParameterType.event, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "summon",
        documentation: "Summons an entity.",
        permission_level: 1,
        parameters: [
            { text: "summon", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "spawnPos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos z", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "facing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "lookAtPosition x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "lookAtPosition y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "lookAtPosition z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "spawn event", type: parameter_type_1.ParameterType.event, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "summon",
        documentation: "Summons an entity.",
        permission_level: 1,
        parameters: [
            { text: "summon", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "spawnPos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPos z", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "y rot", type: parameter_type_1.ParameterType.rotation, required: false },
            { text: "x rot", type: parameter_type_1.ParameterType.rotation, required: false },
            { text: "spawn event", type: parameter_type_1.ParameterType.event, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
];
//# sourceMappingURL=summon.js.map