"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msg = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The msg command */
exports.msg = [
    {
        name: "msg",
        documentation: "Sends a private message to one or more players.",
        permission_level: 0,
        parameters: [
            { text: "msg", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "message", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=msg.js.map