"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.music = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The music command */
exports.music = [
    {
        name: "music",
        documentation: "Allows you to control playing music tracks.",
        permission_level: 1,
        parameters: [
            { text: "music", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "play", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "track name", type: parameter_type_1.ParameterType.music, required: true },
            { text: "volume", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0.01, maximum: 1 } },
            { text: "fade seconds", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0 } },
            { text: "repeat mode", type: parameter_type_1.ParameterType.musicRepeatMode, required: false },
        ],
    },
    {
        name: "music",
        documentation: "Allows you to control playing music tracks.",
        permission_level: 1,
        parameters: [
            { text: "music", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "queue", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "track name", type: parameter_type_1.ParameterType.music, required: true },
            { text: "volume", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0.01, maximum: 1 } },
            { text: "fade seconds", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0.01, maximum: 1 } },
            { text: "repeat mode", type: parameter_type_1.ParameterType.musicRepeatMode, required: false },
        ],
    },
    {
        name: "music",
        documentation: "Allows you to control playing music tracks.",
        permission_level: 1,
        parameters: [
            { text: "music", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "stop", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "fade seconds", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0 } },
        ],
    },
    {
        name: "music",
        documentation: "Allows you to control playing music tracks.",
        permission_level: 1,
        parameters: [
            { text: "music", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "volume", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "volume", type: parameter_type_1.ParameterType.float, required: true, options: { minimum: 0.01, maximum: 1 } },
        ],
    },
];
//# sourceMappingURL=music.js.map