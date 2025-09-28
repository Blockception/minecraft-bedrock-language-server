"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_trading_implementation = diagnose_trading_implementation;
const __1 = require("../..");
function diagnose_trading_implementation(id, diagnoser) {
    const strId = typeof id === "string" ? id : id.text;
    //Project has trading
    const anim = diagnoser.context.getProjectData().behaviors.trading.get(strId, diagnoser.project);
    if (anim === undefined) {
        __1.Errors.missing("behaviors", "trading", strId, diagnoser, id);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map