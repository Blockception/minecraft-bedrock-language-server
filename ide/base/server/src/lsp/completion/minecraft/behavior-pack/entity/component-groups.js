"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../../../constants");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Animation });
    context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
        const generateDoc = (group) => `The entity componen group: ${group} from ${entity.id}`;
        builder.generate(entity.groups, generateDoc);
    });
}
//# sourceMappingURL=component-groups.js.map