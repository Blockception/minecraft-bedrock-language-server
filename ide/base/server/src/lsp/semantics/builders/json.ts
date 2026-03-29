import { TextDocument } from '../../documents/text-document';
import { BaseSemanticTokensBuilder } from './base';

/**
 *
 */
export class JsonSemanticTokensBuilder extends BaseSemanticTokensBuilder {
  /**
   *
   * @param doc
   */
  constructor(doc: Pick<TextDocument, 'positionAt' | 'configuration'>) {
    super(doc);
  }
}
