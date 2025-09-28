"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_json_error = handle_json_error;
const types_1 = require("../../types");
function handle_json_error(err, diagnoser) {
    if (typeof err.message !== "string") {
        diagnoser.add(0, "Invalid json structure\nmessage:" + JSON.stringify(err), types_1.DiagnosticSeverity.error, "json.invalid");
    }
    const message = err.message;
    const word = {
        offset: 0,
        text: " ",
    };
    const token = safe_first_get(/token ([^ ]+) /gim, message);
    if (token)
        word.text = token;
    const pos = safe_first_get(/position (\d+)/gim, message);
    if (pos)
        word.offset = Number.parseInt(pos);
    diagnoser.add(word, message, types_1.DiagnosticSeverity.error, "json.invalid");
}
function safe_first_get(regex, text) {
    var _a;
    const match = regex.exec(text);
    if (match)
        return (_a = match[1]) !== null && _a !== void 0 ? _a : match[0];
    return undefined;
}
//# sourceMappingURL=errors.js.map