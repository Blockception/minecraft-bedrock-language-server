"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const constants_1 = require("../../../../constants");
const builder_1 = require("../../builder");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Block });
    builder.generate(context.database.ProjectData.resourcePacks.blockCullingRules, (bc) => `Block culling defined by ${bc.id}`);
}
function provideJsonCompletion(context) {
    return blockCullingRPJsonCompletion.onCompletion(context);
}
const blockCullingRPJsonCompletion = new builder_1.JsonPathCompletion({
    match: (item) => item.endsWith('/bone'),
    onCompletion: (context) => {
        const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Block });
        context.database.ProjectData.resourcePacks.models.forEach((model) => {
            builder.generate(model.bones, () => `Bone defined by ${model.id}`);
        });
    },
});
//# sourceMappingURL=block-culling.js.map