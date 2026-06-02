import { Languages } from '@blockception/ide-shared';
import {
  Connection,
  InlineValue,
  InlineValueParams,
  InlineValueVariableLookup,
  Range,
} from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';

const VariablePattern = /\b[a-zA-Z_][a-zA-Z0-9_.]*\b/g;

export class InlineValueService extends BaseService implements IService {
  readonly name: string = 'inline-values';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[inline-values]'), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set('inlineValueProvider', {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.languages.inlineValue.on(this.onInlineValue.bind(this)));
  }

  private async onInlineValue(params: InlineValueParams): Promise<InlineValue[]> {
    if (!this.extension.settings.InlineValues.Enable) return [];

    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return [];

    if (!SupportsInlineValues(document.languageId)) return [];

    const output: InlineValue[] = [];
    const startLine = Math.max(params.range.start.line, 0);
    const endLine = Math.min(params.range.end.line, params.context.stoppedLocation.start.line);

    for (let line = startLine; line <= endLine; line++) {
      const text = document.getLine(line);
      const lineStart = line === params.range.start.line ? params.range.start.character : 0;
      const lineEnd = line === params.range.end.line ? params.range.end.character : text.length;
      if (lineEnd <= lineStart) continue;

      const segment = text.slice(lineStart, lineEnd);
      VariablePattern.lastIndex = 0;

      for (let match = VariablePattern.exec(segment); match !== null; match = VariablePattern.exec(segment)) {
        const variableName = match[0];
        if (IsIgnoredName(variableName)) continue;

        const startCharacter = lineStart + match.index;
        const endCharacter = startCharacter + variableName.length;

        output.push(
          InlineValueVariableLookup.create(
            Range.create(line, startCharacter, line, endCharacter),
            variableName,
            true,
          ),
        );
      }
    }

    return output;
  }
}

function SupportsInlineValues(languageId: string): boolean {
  return languageId === Languages.McFunctionIdentifier || languageId === Languages.McMolangIdentifier;
}

function IsIgnoredName(variableName: string): boolean {
  return variableName === 'true' || variableName === 'false';
}
