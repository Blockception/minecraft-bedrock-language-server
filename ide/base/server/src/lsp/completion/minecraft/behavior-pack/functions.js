"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../../constants");
function provideCompletion(context) {
    const generateDoc = (item) => `The mcfunction: ${item.id}}`;
    //Project data
    context.builder.generate(context.database.ProjectData.behaviorPacks.functions, generateDoc, constants_1.Kinds.Completion.Functions);
    //No vanilla data
}
//# sourceMappingURL=functions.js.map