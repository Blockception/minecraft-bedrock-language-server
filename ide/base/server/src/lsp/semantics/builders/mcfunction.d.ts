import { TextDocument } from '../../documents/text-document';
import { BaseSemanticTokensBuilder } from './base';
import { JsonSemanticTokensBuilder } from './json';
/**
 *
 */
export declare class McfunctionSemanticTokensBuilder extends BaseSemanticTokensBuilder {
    /**
     *
     * @param doc
     */
    constructor(doc: Pick<TextDocument, 'positionAt' | 'configuration'>);
    /**
     *
     * @param Builder
     * @returns
     */
    static FromJson(Builder: JsonSemanticTokensBuilder): McfunctionSemanticTokensBuilder;
}
//# sourceMappingURL=mcfunction.d.ts.map