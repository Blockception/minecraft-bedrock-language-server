"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
const jsonc_1 = require("jsonc");
const types_1 = require("../../types");
const errors_1 = require("./errors");
var Json;
(function (Json) {
    /**Loads the object and casts it to the specified thandle_json_errorype, if it fails then undefined is loaded and the error message is send to the diagnoser
     * @param doc The text document to load from
     * @param diagnoser The diagnoser to load from
     * @returns Either the object cast to the specific type, or undefined if failed*/
    function LoadReport(diagnoser) {
        try {
            //get text
            const text = diagnoser.document.getText();
            //get object
            const temp = parse(text);
            // Format version
            // diagnoseFormatVersionIf(temp, diagnoser);
            return temp;
            //cast object
        }
        catch (err) {
            (0, errors_1.handle_json_error)(err, diagnoser);
        }
        return undefined;
    }
    Json.LoadReport = LoadReport;
    function parse(text) {
        return jsonc_1.jsonc.parse(text, { stripComments: true });
    }
    Json.parse = parse;
    /**
     *
     * @param value
     * @param diagnoser
     * @param type
     * @param code
     * @param checkFn
     * @returns
     */
    function TypeCheck(value, diagnoser, type, code, checkFn) {
        if (checkFn(value)) {
            return true;
        }
        diagnoser.add(0, "Json cannot be casted to: " + type, types_1.DiagnosticSeverity.error, code);
        return false;
    }
    Json.TypeCheck = TypeCheck;
})(Json || (exports.Json = Json = {}));
function isDiagnoser(diag) {
    return diag.document !== undefined;
}
//# sourceMappingURL=json.js.map