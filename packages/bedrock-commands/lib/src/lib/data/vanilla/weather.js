"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weather = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The weather command */
exports.weather = [
    {
        name: "weather",
        documentation: "Clears the weather.",
        permission_level: 1,
        parameters: [
            { text: "weather", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "clear", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "duration", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "weather",
        documentation: "Sets the weather.",
        permission_level: 1,
        parameters: [
            { text: "weather", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "query", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "weather",
        documentation: "Sets the weather.",
        permission_level: 1,
        parameters: [
            { text: "weather", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "rain", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "duration", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "weather",
        documentation: "Sets the weather.",
        permission_level: 1,
        parameters: [
            { text: "weather", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "thunder", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "duration", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
];
//# sourceMappingURL=weather.js.map