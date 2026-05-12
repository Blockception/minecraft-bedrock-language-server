"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../../constants");
function provideCompletion(context) {
    const generateDoc = (item) => `The mcstructure: ${item.id}`;
    context.builder.generate(context.database.ProjectData.behaviorPacks.structures, generateDoc, constants_1.Kinds.Completion.Structure);
    //No vanilla data
}
//# sourceMappingURL=structures.js.map