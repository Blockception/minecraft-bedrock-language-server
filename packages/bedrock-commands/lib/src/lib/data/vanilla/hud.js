"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hud = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The hud command */
exports.hud = [
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "air bubbles", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "all", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "armor", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "crosshair", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "health", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "horse health", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "hotbar", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "hunger", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "item text", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "paperdoll", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "progress bar", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "status effects", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "tooltips", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "hide", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "touch controls", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "air bubbles", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "all", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "armor", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "crosshair", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "health", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "horse health", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "hotbar", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "hunger", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "item text", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "paperdoll", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "progress bar", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "status effects", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "tooltips", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "hud",
        documentation: "Changes the visibility of hud elements.",
        permission_level: 1,
        parameters: [
            { text: "hud", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "reset", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "touch controls", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
];
//# sourceMappingURL=hud.js.map