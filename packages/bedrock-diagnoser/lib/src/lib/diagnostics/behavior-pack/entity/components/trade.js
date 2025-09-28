"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_trade_table = check_trade_table;
const diagnose_1 = require("../../trading/diagnose");
function check_trade_table(_name, component, _context, diagnoser) {
    if (component === undefined)
        return;
    if (typeof component.table !== "string")
        return;
    const table = component.table;
    (0, diagnose_1.diagnose_trading_implementation)(table, diagnoser);
}
//# sourceMappingURL=trade.js.map