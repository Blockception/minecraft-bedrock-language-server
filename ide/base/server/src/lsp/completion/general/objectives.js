"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
const util_1 = require("../../../util");
function provideCompletion(context) {
    const builder = context.builder;
    const data = context.document.configuration();
    const generateDoc = (item) => {
        if (typeof item === 'string') {
            return `The objective: ${item}`;
        }
        const filename = (0, util_1.getFilename)(item.location.uri);
        return `The objective: ${item.id}\nLocation: ${filename}`;
    };
    //From project data
    builder.generate(context.database.ProjectData.general.objectives, generateDoc, constants_1.Kinds.Completion.Objectives);
    builder.generate(data.definitions.objective?.defined, generateDoc, constants_1.Kinds.Completion.Objectives);
}
//# sourceMappingURL=objectives.js.map