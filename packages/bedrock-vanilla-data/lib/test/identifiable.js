"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test_Identifiable = Test_Identifiable;
exports.Check_Identifiable = Check_Identifiable;
exports.Check_IsFunction = Check_IsFunction;
const assert_1 = require("assert");
const console_1 = require("console");
const Identifiable_1 = require("../src/Lib/Types/Identifiable");
function Test_Identifiable(data) {
    if (Identifiable_1.Identifiable.is(data)) {
        (0, console_1.assert)(data.id.length > 0, `Not a length on ID: ${JSON.stringify(data)}`);
    }
    else {
        (0, assert_1.fail)(`Not a proper Identifiable: ${JSON.stringify(data)}`);
    }
}
function Check_Identifiable(data) {
    data.forEach((item) => {
        (0, console_1.assert)(count(data, item) === 1, "found duplicate items");
    });
}
function Check_IsFunction(items, check) {
    items.forEach((item, index) => {
        if (check(item)) {
            // do nothing
        }
        else {
            throw new Error(`at '${index}', Did not pass the is function check: ${check.name}`);
        }
    });
}
function count(data, id) {
    let out = 0;
    const find = typeof id === "string" ? id : id.id;
    data.forEach((item) => {
        if (typeof item !== "string")
            item = item.id;
        if (item === find)
            out++;
    });
    return out;
}
//# sourceMappingURL=identifiable.js.map