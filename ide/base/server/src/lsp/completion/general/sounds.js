"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
function provideCompletion(context) {
    context.builder.generate(context.database.ProjectData.resourcePacks.sounds, (item) => `The custom sound definition: '${item.id}'`, constants_1.Kinds.Completion.Sound);
}
//# sourceMappingURL=sounds.js.map