"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticSeverity = void 0;
/**The severity of an error */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**The error is not an issue, but preferably not there*/
    DiagnosticSeverity[DiagnosticSeverity["none"] = 0] = "none";
    /**The error is a possible issue, could be improved or a suggestion*/
    DiagnosticSeverity[DiagnosticSeverity["info"] = 1] = "info";
    /**The error is an issue, but code can continue as normal*/
    DiagnosticSeverity[DiagnosticSeverity["warning"] = 2] = "warning";
    /**The error is an issue and can cause problems during runtime*/
    DiagnosticSeverity[DiagnosticSeverity["error"] = 3] = "error";
})(DiagnosticSeverity || (exports.DiagnosticSeverity = DiagnosticSeverity = {}));
//# sourceMappingURL=severity.js.map