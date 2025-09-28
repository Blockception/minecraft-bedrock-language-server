"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harvestMolang = harvestMolang;
const molang_1 = require("bc-minecraft-molang/lib/src/molang");
/**
 * Harvests all the possible molang data, but clears the cache afterwards
 * @param docOrStr The text or TextDocument to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 * @returns
 */
function harvestMolang(docOrStr, obj) {
    if (typeof docOrStr !== "string")
        docOrStr = docOrStr.getText();
    const objSet = obj !== null && obj !== void 0 ? obj : JSON.parse(docOrStr);
    const set = new molang_1.MolangSet();
    try {
        set.harvest(objSet, docOrStr);
    }
    catch (err) {
        console.warn("received an error during molang parsing during harvesting of molang data, skipping report to let it be handled by the diagnoser", err);
    }
    finally {
        set.cache.clear();
    }
    return set;
}
//# sourceMappingURL=harvest.js.map