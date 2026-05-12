"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
function provideCompletion(context) {
    const generateDoc = (item) => `The tickingarea: ${item.id}\nLocation: ${item.location.uri}`;
    const builder = context.builder;
    const data = context.document.configuration();
    builder.generate(context.database.ProjectData.general.tickingAreas, generateDoc, constants_1.Kinds.Completion.Tickingarea);
    builder.generate(data.definitions.tag?.defined, (item) => `The defined tickingarea: ${item}`, constants_1.Kinds.Completion.Tickingarea);
}
//# sourceMappingURL=tickingareas.js.map