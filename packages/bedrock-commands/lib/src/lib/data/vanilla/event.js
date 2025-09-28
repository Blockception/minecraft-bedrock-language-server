"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The event command */
exports.event = [
    {
        name: "event",
        documentation: "Triggers an event for the specified object(s)",
        permission_level: 1,
        parameters: [
            { text: "event", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "event name", type: parameter_type_1.ParameterType.event, required: true },
        ],
    },
];
//# sourceMappingURL=event.js.map