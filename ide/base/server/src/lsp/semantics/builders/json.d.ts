import { TextDocument } from '../../documents/text-document';
import { BaseSemanticTokensBuilder } from './base';
/**
 *
 */
export declare class JsonSemanticTokensBuilder extends BaseSemanticTokensBuilder {
    /**
     *
     * @param doc
     */
    constructor(doc: Pick<TextDocument, 'positionAt' | 'configuration'>);
}
//# sourceMappingURL=json.d.ts.map