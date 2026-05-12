import { InitializeResult } from 'vscode-languageserver';
type Capabilities = InitializeResult['capabilities'];
export declare class CapabilityBuilder {
    private base;
    constructor(base: Capabilities);
    result(): import("vscode-languageserver").ServerCapabilities<any>;
    /**
     * Tell the client that this server supports code completion.
     * @param data
     */
    addCompletion(data: Capabilities['completionProvider']): {
        triggerCharacters?: string[];
        allCommitCharacters?: string[];
        resolveProvider?: boolean;
        completionItem?: {
            labelDetailsSupport?: boolean;
        };
        workDoneProgress?: boolean;
    };
    set<K extends keyof Capabilities>(item: K, data: Capabilities[K]): import("vscode-languageserver").ServerCapabilities<any>[K];
}
export {};
//# sourceMappingURL=capabilities.d.ts.map