"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.place = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The place command */
exports.place = [
    {
        name: "place",
        documentation: "Places a jigsaw structure, feature, or feature rule in the world.",
        permission_level: 2,
        parameters: [
            { text: "place", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "feature", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "feature", type: parameter_type_1.ParameterType.locateFeature, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: false },
        ],
    },
    {
        name: "place",
        documentation: "Places a jigsaw structure, feature, or feature rule in the world.",
        permission_level: 2,
        parameters: [
            { text: "place", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "featurerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "featurerule", type: parameter_type_1.ParameterType.locateFeature, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: false },
        ],
    },
    {
        name: "place",
        documentation: "Places a jigsaw structure, feature, or feature rule in the world.",
        permission_level: 2,
        parameters: [
            { text: "place", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "jigsaw", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "pool", type: parameter_type_1.ParameterType.function, required: true },
            { text: "jigsaw target", type: parameter_type_1.ParameterType.jigsaw, required: true },
            { text: "max depth", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "pos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "pos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "pos z", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "keep jigsaws", type: parameter_type_1.ParameterType.boolean, required: false },
            { text: "include entities", type: parameter_type_1.ParameterType.boolean, required: false },
            { text: "liquid settings", type: parameter_type_1.ParameterType.unknown, required: false },
        ],
    },
    {
        name: "place",
        documentation: "Places a jigsaw structure, feature, or feature rule in the world.",
        permission_level: 2,
        parameters: [
            { text: "place", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "structure", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "structure", type: parameter_type_1.ParameterType.jigsaw, required: true },
            { text: "pos x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "pos y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "pos z", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "ignore start height", type: parameter_type_1.ParameterType.boolean, required: false },
            { text: "keep jigsaws", type: parameter_type_1.ParameterType.boolean, required: false },
            { text: "include entities", type: parameter_type_1.ParameterType.boolean, required: false },
            { text: "liquid settings", type: parameter_type_1.ParameterType.unknown, required: false },
        ],
    },
];
//# sourceMappingURL=place.js.map