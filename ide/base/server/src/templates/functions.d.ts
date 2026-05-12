import { MCProject } from 'bc-minecraft-project';
import { IExtensionContext } from '../lsp/extension';
type ReplaceFunction = (...args: any[]) => string;
export interface FunctionContext {
    filename: string;
    folder: string;
    templateID: string;
    pack: string;
    attributes: Record<string, string>;
}
export declare class TemplateFunctions {
    _fcontent: FunctionContext;
    _context: IExtensionContext;
    readonly _version: string;
    constructor(version: string, fcontent: FunctionContext, context: IExtensionContext);
    get(attribute: keyof typeof this.data): ReplaceFunction | undefined;
    process(template: string): string;
    getPack(): any;
    getProject(): MCProject;
    getAttribute(attr: string): string;
    data: Record<string, ReplaceFunction>;
}
export declare function safeID(ID: string, replace?: string): string;
export declare function safeIDWithoutNamespace(ID: string, replace?: string): string;
export declare function WithoutNamespace(id: string): string;
export {};
//# sourceMappingURL=functions.d.ts.map