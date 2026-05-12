"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Coordinate });
    builder.add({ label: '~', documentation: 'Relative coordinate' }).preselect = true;
    builder.add({ label: '~1', documentation: 'Relative coordinate' });
    builder.add({ label: '~-1', documentation: 'Relative coordinate' });
    builder.add({ label: '^1', documentation: 'Local coordinate' });
    builder.add({ label: '^', documentation: 'Local coordinate' });
    builder.add({ label: '^-1', documentation: 'Local coordinate' });
    builder.add({ label: '1', documentation: 'Coordinate' });
    builder.add({ label: '-1', documentation: 'Coordinate' });
}
//# sourceMappingURL=coordinate.js.map