"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ride = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The ride command */
exports.ride = [
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "start_riding", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "ride", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "teleport ride", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "if group fits", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "start_riding", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "ride", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "teleport ride", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "until full", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "start_riding", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "ride", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "teleport rider", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "if group fits", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "start_riding", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "ride", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "teleport rider", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "until full", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "stop_riding", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "summon_ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "no ride change", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "spawn event", type: parameter_type_1.ParameterType.string, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "summon_ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "reassign rides", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "spawn event", type: parameter_type_1.ParameterType.string, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "riders", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "summon_ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "skip riders", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "spawn event", type: parameter_type_1.ParameterType.string, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "rides", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "evict_riders", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "ride",
        documentation: "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
        permission_level: 1,
        parameters: [
            { text: "ride", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "rides", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "summon_rider", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity type", type: parameter_type_1.ParameterType.entity, required: true },
            { text: "spawn event", type: parameter_type_1.ParameterType.string, required: false },
            { text: "name tag", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
];
//# sourceMappingURL=ride.js.map