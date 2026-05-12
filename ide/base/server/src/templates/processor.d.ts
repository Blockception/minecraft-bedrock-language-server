import { TemplateFunctions } from './functions';
import { TemplateFallback } from './fallback';
import { IExtensionContext } from '../lsp/extension';
export declare class TemplateProcessor {
    protected _filename: string;
    protected _content: string;
    private _context;
    processor: TemplateFunctions;
    constructor(context: IExtensionContext, filename: string, content: string, templateId: string, folder: string, attributes: Record<string, string>);
    /**
     *
     * @returns
     */
    createFile(): Promise<void>;
    process(): void;
}
/**
 *
 */
export declare namespace TemplateProcessor {
    /**
     *
     * @param template
     * @param folder
     * @param fallback
     * @returns
     */
    function create(context: IExtensionContext, template: string, folder: string, attributes?: Record<string, string>, fallback?: TemplateFallback): TemplateProcessor;
}
//# sourceMappingURL=processor.d.ts.map