"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.say = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The say command */
exports.say = [
    {
        name: "say",
        documentation: "Sends a message in the chat to other players.",
        permission_level: 1,
        parameters: [
            { text: "say", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "message", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=say.js.map