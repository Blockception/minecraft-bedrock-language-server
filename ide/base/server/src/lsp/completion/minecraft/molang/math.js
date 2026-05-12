"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const general_1 = require("./general");
function provideCompletion(context) {
    bc_minecraft_molang_1.MolangData.General.Math.forEach((item) => (0, general_1.generateMolangFunction)('math', item, context.builder));
}
//# sourceMappingURL=math.js.map