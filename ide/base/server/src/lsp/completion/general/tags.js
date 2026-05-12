"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideCompletionTest = provideCompletionTest;
const constants_1 = require("../../../constants");
const util_1 = require("../../../util");
function provideCompletion(context) {
    const builder = context.builder;
    const data = context.document.configuration();
    builder.generate(context.database.ProjectData.general.tags, generateDocumentation, constants_1.Kinds.Completion.Tag);
    builder.generate(data.definitions.tag?.defined, generateDocumentation, constants_1.Kinds.Completion.Tag);
}
function generateDocumentation(tag) {
    if (typeof tag === 'string')
        return `The tag: ${tag}`;
    const filename = (0, util_1.getFilename)(tag.location.uri);
    return `The tag: ${tag.id}\nLocation: ${filename}`;
}
function provideCompletionTest(context) {
    const data = context.document.configuration();
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Tag });
    builder.add({
        label: 'Any Tag: `tag=`',
        documentation: 'By inserting an `tag=` you test for entities with any kind of tag',
        insertText: '',
    });
    builder.add({
        label: 'No Tags: `tag=!`',
        documentation: 'By inserting an `tag=!` you test for entities with no tags',
        insertText: '!',
    });
    //Add defined tags to the context
    builder.generate(data.definitions.tag?.defined, (tag) => `The defined tag: ${tag}`);
    //Add the tags to the list
    context.database.ProjectData.general.tags.forEach((tag) => {
        builder.add({
            label: tag.id,
            documentation: `Tests for the tag: '${tag.id}'`,
        });
        builder.add({
            label: `!${tag.id}`,
            documentation: `Tests not for the tag: '${tag.id}'`,
        });
    });
}
//# sourceMappingURL=tags.js.map