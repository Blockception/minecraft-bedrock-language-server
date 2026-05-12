"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideDefinedAnimationCompletion = provideDefinedAnimationCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const constants_1 = require("../../../../constants");
const builder_1 = require("../../builder");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined bp animation', 'The bp animation');
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Animation });
    const data = context.document.configuration();
    // Add animations from .mcdefinitions
    builder.generate(data.definitions.animation?.defined, generateDoc);
    builder.generate(context.database.ProjectData.behaviorPacks.animations, generateDoc);
}
function provideDefinedAnimationCompletion(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Animation });
    context.database.ProjectData.behaviorPacks.entities.forEach((item) => {
        builder.generate(item.animations.defined, (anim) => `Animation ${anim} defined  by ${item.id}`);
    });
}
function provideJsonCompletion(context) {
    return animBPJsonCompletion.onCompletion(context);
}
const animBPJsonCompletion = new builder_1.JsonPathCompletion();
//# sourceMappingURL=animations.js.map