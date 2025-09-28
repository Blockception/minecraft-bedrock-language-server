"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter_not_defined = filter_not_defined;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
function* filter_not_defined(using, defined) {
    defined = defined !== null && defined !== void 0 ? defined : bc_minecraft_bedrock_project_1.Defined.create();
    for (let s of using.using) {
        if (!defined.defined.has(s)) {
            yield s;
        }
    }
}
//# sourceMappingURL=using.js.map