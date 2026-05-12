"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionCapabilities = void 0;
var ExtensionCapabilities;
(function (ExtensionCapabilities) {
    function empty() {
        return {
            client: {
                configuration: false,
                diagnostics: false,
                workspace: false,
            },
            server: {
                completion: false,
            },
        };
    }
    ExtensionCapabilities.empty = empty;
    function parseCapabilities(receiver, capabilities) {
        // Does the client support the `workspace/configuration` request?
        // If not, we fall back using global settings.
        receiver.client.configuration = !!(capabilities.workspace && !!capabilities.workspace.configuration);
        receiver.client.workspace = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
        receiver.client.diagnostics = !!(capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation);
    }
    ExtensionCapabilities.parseCapabilities = parseCapabilities;
})(ExtensionCapabilities || (exports.ExtensionCapabilities = ExtensionCapabilities = {}));
//# sourceMappingURL=capabilities.js.map