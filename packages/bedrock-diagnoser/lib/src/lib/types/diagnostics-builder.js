"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = exports.DocumentDiagnosticsBuilder = void 0;
var DocumentDiagnosticsBuilder;
(function (DocumentDiagnosticsBuilder) {
    function wrap(diagnoser, document) {
        let diag = diagnoser;
        diag.document = document;
        return diag;
    }
    DocumentDiagnosticsBuilder.wrap = wrap;
})(DocumentDiagnosticsBuilder || (exports.DocumentDiagnosticsBuilder = DocumentDiagnosticsBuilder = {}));
var Metadata;
(function (Metadata) {
    function withMetadata(source, metadata) {
        const result = source;
        result["metadata"] = metadata;
        return result;
    }
    Metadata.withMetadata = withMetadata;
})(Metadata || (exports.Metadata = Metadata = {}));
//# sourceMappingURL=diagnostics-builder.js.map