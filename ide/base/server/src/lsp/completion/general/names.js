"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
function provideCompletion(context) {
    const data = context.document.configuration();
    const builder = context.builder;
    //From definitions
    const generateDoc = (item) => 'The defined name: ' + item;
    builder.generate(data.definitions.name?.defined, generateDoc, constants_1.Kinds.Completion.Objectives);
}
//# sourceMappingURL=names.js.map