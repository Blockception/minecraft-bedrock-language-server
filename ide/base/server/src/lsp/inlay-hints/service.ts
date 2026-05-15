import { Languages } from '@blockception/ide-shared';
import { Command, ParameterType } from 'bc-minecraft-bedrock-command';
import {
  CancellationToken,
  Connection,
  InlayHint,
  InlayHintKind,
  InlayHintParams,
  Position,
} from 'vscode-languageserver';
import { IsEducationEnabled } from '../../project/attributes';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';

export class InlayHintService extends BaseService implements IService {
  readonly name: string = 'inlay-hints';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[inlay-hints]'), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set('inlayHintProvider', {
      resolveProvider: false,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.languages.inlayHint.on(this.onInlayHint.bind(this)));
  }

  private onInlayHint(params: InlayHintParams, _token: CancellationToken): InlayHint[] {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return [];
    if (document.languageId !== Languages.McFunctionIdentifier) return [];

    const out: InlayHint[] = [];
    const maxLine = Math.min(document.lineCount - 1, params.range.end.line);
    const minLine = Math.max(0, params.range.start.line);
    const edu = IsEducationEnabled(document);

    for (let lineIndex = minLine; lineIndex <= maxLine; lineIndex++) {
      const line = document.getLine(lineIndex);
      if (line.trim() === '' || line.trimStart().startsWith('#')) continue;

      const lineOffset = document.offsetAt({ line: lineIndex, character: 0 });
      const cursorOffset = line.length;

      for (const hint of provideInlayHints(line, cursorOffset, edu)) {
        const position = document.positionAt(lineOffset + hint.offset);
        const inlayHint: InlayHint = {
          kind: InlayHintKind.Parameter,
          label: `${hint.label}:`,
          paddingRight: true,
          position,
        };

        if (isPositionInRange(position, params.range.start, params.range.end)) {
          out.push(inlayHint);
        }
      }
    }

    return out;
  }
}

export interface CommandInlayHint {
  label: string;
  offset: number;
}

export function provideInlayHints(line: string, cursorOffset: number, edu: boolean): CommandInlayHint[] {
  let command: Command = Command.parse(line, 0);
  if (command.isEmpty()) return [];

  let subCommand = command.isInSubCommand(cursorOffset, edu);
  while (subCommand) {
    command = subCommand;
    subCommand = command.isInSubCommand(cursorOffset, edu);
  }

  const bestMatch = command.getBestMatch(edu)[0];
  if (!bestMatch) return [];

  const max = Math.min(bestMatch.parameters.length, command.parameters.length);
  const out: CommandInlayHint[] = [];

  for (let index = 1; index < max; index++) {
    const written = command.parameters[index];
    const signature = bestMatch.parameters[index];
    if (!written || !signature) continue;

    if (
      signature.type === ParameterType.keyword ||
      signature.type === ParameterType.command ||
      signature.type === ParameterType.executeSubcommand
    ) {
      continue;
    }

    out.push({ label: signature.text, offset: written.offset });
  }

  return out;
}

function isPositionInRange(pos: Position, start: Position, end: Position): boolean {
  if (pos.line < start.line || pos.line > end.line) return false;

  if (pos.line === start.line && pos.character < start.character) return false;
  if (pos.line === end.line && pos.character > end.character) return false;

  return true;
}
