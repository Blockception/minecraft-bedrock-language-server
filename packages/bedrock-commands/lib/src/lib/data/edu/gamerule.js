"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamerule = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The gamerule command */
exports.gamerule = [
    {
        name: "gamerule",
        documentation: "When set to true, players may use TNT near others. You may also use specialty blocks (allow, deny, border) to help limit potential damage.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "allowdestructiveobjects", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Mobs are living, moving creatures found within the Minecraft world. Friendly (creatures like chickens and ocelots) and not so friendly mobs (creatures like creepers) are allowed to appear in the world when this is turned on.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "allowmobs", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Disables chat for all players when set to true, otherwise players in your world can communicate with each other within the world they are in via the client. Chatting is on by default.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "globalmute", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=gamerule.js.map