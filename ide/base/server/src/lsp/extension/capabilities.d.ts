import { ClientCapabilities } from 'vscode-languageserver';
export interface ExtensionCapabilities {
    client: {
        configuration: boolean;
        diagnostics: boolean;
        workspace: boolean;
    };
    server: {
        completion: boolean;
    };
}
export declare namespace ExtensionCapabilities {
    function empty(): ExtensionCapabilities;
    function parseCapabilities(receiver: ExtensionCapabilities, capabilities: ClientCapabilities): void;
}
//# sourceMappingURL=capabilities.d.ts.map