"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobevent = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The mobevent command */
exports.mobevent = [
    {
        name: "mobevent",
        documentation: "Controls what mob events are allowed to run.",
        permission_level: 1,
        parameters: [
            { text: "mobevent", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "event", type: parameter_type_1.ParameterType.event, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=mobevent.js.map