"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Boolean });
    builder.add({ label: 'false', documentation: 'The boolean value for `false`' });
    builder.add({ label: 'true', documentation: 'The boolean value for `true`' });
}
//# sourceMappingURL=boolean.js.map