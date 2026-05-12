"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../constants");
const util_1 = require("../../../util");
function provideCompletion(context) {
    const generateDoc = (fakeEntities) => {
        const filename = (0, util_1.getFilename)(fakeEntities.location.uri);
        return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
    };
    context.builder.generate(context.database.ProjectData.general.fakeEntities, generateDoc, constants_1.Kinds.Completion.FakeEntity);
}
//# sourceMappingURL=fake-entity.js.map