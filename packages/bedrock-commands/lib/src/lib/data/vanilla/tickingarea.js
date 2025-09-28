"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickingarea = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The tickingarea command */
exports.tickingarea = [
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "circle", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "center x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "center y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "center z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "radius", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "name", type: parameter_type_1.ParameterType.tickingarea, required: false },
            { text: "preload", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "from x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "name", type: parameter_type_1.ParameterType.tickingarea, required: false },
            { text: "preload", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "list", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "all-dimensions", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "preload", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.tickingarea, required: true },
            { text: "preload", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "preload", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "preload", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "remove", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.tickingarea, required: true },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "remove", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
        ],
    },
    {
        name: "tickingarea",
        documentation: "Add, remove, or list ticking areas.",
        permission_level: 1,
        parameters: [
            { text: "tickingarea", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "remove_all", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=tickingarea.js.map