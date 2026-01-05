import { DocumentLocation } from '@blockception/packages-shared';
import {
  DiagnosticsBuilderContent,
  DiagnosticSeverity,
  ManagedDiagnosticsBuilder,
} from 'bc-minecraft-bedrock-diagnoser';
import { MCProject } from 'bc-minecraft-project';
import * as vscode from 'vscode-languageserver';
import { Diagnostic } from 'vscode-languageserver';
import { GetPosition, GetRange } from '../../util';
import { TextDocument } from '../documents/text-document';

/**
 * Parses mc-disable comments from document text
 * Returns a map of disabled codes and the lines they apply to
 */
interface DisabledCodes {
  fileLevel: Set<string>; // Codes disabled for the entire file
  lineLevel: Map<number, Set<string>>; // Codes disabled for specific lines (line number -> codes)
}

function parseDisabledCodes(doc: TextDocument): DisabledCodes {
  const result: DisabledCodes = {
    fileLevel: new Set(),
    lineLevel: new Map(),
  };

  const text = doc.getText();
  // Single regex that matches both file-level and line-level disables
  const disableRegex = /\/\/\s*mc-disable(?:-(next-line))?\s+(.+)/g;
  
  let match;
  while ((match = disableRegex.exec(text)) !== null) {
    const isNextLine = match[1] !== undefined; // Check if it's mc-disable-next-line
    const codesStr = match[2];
    const codes = codesStr.split(',').map(c => c.trim()).filter(c => c.length > 0);
    
    if (isNextLine) {
      // Line-level disable: applies to the next line
      const position = doc.positionAt(match.index);
      const targetLine = position.line + 1;
      if (!result.lineLevel.has(targetLine)) {
        result.lineLevel.set(targetLine, new Set());
      }
      codes.forEach(code => result.lineLevel.get(targetLine)!.add(code));
    } else {
      // File-level disable: applies to entire file
      codes.forEach(code => result.fileLevel.add(code));
    }
  }
  
  return result;
}

export class InternalDiagnoser implements ManagedDiagnosticsBuilder<TextDocument> {
  public doc: TextDocument;
  public items: Diagnostic[];
  public context: DiagnosticsBuilderContent<TextDocument>;
  public project: MCProject;
  public done: () => void;
  private disabledCodes: DisabledCodes;

  /**@inheritdoc*/
  constructor(
    doc: TextDocument,
    project: MCProject,
    context: DiagnosticsBuilderContent<TextDocument>,
    doneFN: (e: InternalDiagnoser) => void,
  ) {
    this.doc = doc;
    this.items = [];

    this.project = project;
    this.context = context;
    this.done = () => doneFN(this);
    
    // Parse disabled codes from document
    this.disabledCodes = parseDisabledCodes(doc);
  }

  /**@inheritdoc*/
  add(position: DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
    //Was diagnostics code disabled in project settings
    if (this.project.attributes['diagnostic.disable.' + code] === 'true') return;
    
    const codeStr = String(code);
    
    // Check if code is disabled at file level
    if (this.disabledCodes.fileLevel.has(codeStr)) return;
    
    // Optimization: Check if there are any line-level disablements before getting line number
    if (this.disabledCodes.lineLevel.size > 0) {
      const line = GetPosition(position, this.doc).line;
      const lineCodes = this.disabledCodes.lineLevel.get(line);
      if (lineCodes && lineCodes.has(codeStr)) return;
    }

    const error: Diagnostic = {
      message: message,
      code: code,
      severity: getSeverity(severity),
      range: GetRange(position, this.doc),
      source: 'mc',
    };

    if (typeof code === 'number') {
      error.codeDescription = {
        href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/codes/main.md#${code}`,
      };
    } else {
      error.codeDescription = {
        href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/${code.replace(/\./gi, '/')}.md`,
      };
    }

    this.items.push(error);
  }
}

/**
 *
 * @param severity
 * @returns
 */
function getSeverity(severity: DiagnosticSeverity): vscode.DiagnosticSeverity {
  switch (severity) {
    case DiagnosticSeverity.info:
      return vscode.DiagnosticSeverity.Information;

    case DiagnosticSeverity.none:
      return vscode.DiagnosticSeverity.Hint;

    case DiagnosticSeverity.warning:
      return vscode.DiagnosticSeverity.Warning;

    case DiagnosticSeverity.error:
    default:
      return vscode.DiagnosticSeverity.Error;
  }
}
