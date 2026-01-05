import { DocumentLocation } from '@blockception/packages-shared';
import {
  DiagnosticsBuilderContent,
  DiagnosticSeverity,
  ManagedDiagnosticsBuilder,
} from 'bc-minecraft-bedrock-diagnoser';
import { MCProject } from 'bc-minecraft-project';
import * as vscode from 'vscode-languageserver';
import { Diagnostic } from 'vscode-languageserver';
import { GetRange } from '../../util';
import { TextDocument } from '../documents/text-document';

/**
 * Parses mc-disable comments from document text
 * Returns a map of disabled codes and the lines they apply to
 */
interface DisabledCodes {
  fileLevel: Set<string>; // Codes disabled for the entire file
  lineLevel: Map<number, Set<string>>; // Codes disabled for specific lines (line number -> codes)
}

function parseDisabledCodes(text: string): DisabledCodes {
  const result: DisabledCodes = {
    fileLevel: new Set(),
    lineLevel: new Map(),
  };

  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for file-level disable: // mc-disable <code>[,code2,...]
    const fileLevelMatch = line.match(/^\/\/\s*mc-disable\s+(.+)/);
    if (fileLevelMatch) {
      const codes = fileLevelMatch[1].split(',').map(c => c.trim()).filter(c => c.length > 0);
      codes.forEach(code => result.fileLevel.add(code));
      continue;
    }
    
    // Check for next-line disable: // mc-disable-next-line <code>[,code2,...]
    const nextLineMatch = line.match(/^\/\/\s*mc-disable-next-line\s+(.+)/);
    if (nextLineMatch) {
      const codes = nextLineMatch[1].split(',').map(c => c.trim()).filter(c => c.length > 0);
      const targetLine = i + 1;
      if (!result.lineLevel.has(targetLine)) {
        result.lineLevel.set(targetLine, new Set());
      }
      codes.forEach(code => result.lineLevel.get(targetLine)!.add(code));
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
    this.disabledCodes = parseDisabledCodes(doc.getText());
  }

  /**@inheritdoc*/
  add(position: DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
    //Was diagnostics code disabled in project settings
    if (this.project.attributes['diagnostic.disable.' + code] === 'true') return;
    
    const codeStr = String(code);
    
    // Check if code is disabled at file level
    if (this.disabledCodes.fileLevel.has(codeStr)) return;
    
    // Check if code is disabled for this specific line
    // Convert position to line number
    let line: number;
    if (typeof position === 'number') {
      // It's an offset, convert to line
      const text = this.doc.getText();
      const lines = text.substring(0, position).split('\n');
      line = lines.length - 1;
    } else if (typeof position === 'object' && 'line' in position) {
      // It's a Position object
      line = position.line;
    } else if (typeof position === 'object' && 'offset' in position) {
      // It's an OffsetWord
      const text = this.doc.getText();
      const lines = text.substring(0, position.offset).split('\n');
      line = lines.length - 1;
    } else {
      // It's a JsonPath string, we need to resolve it
      const offset = DocumentLocation.toOffset(position, this.doc.getText());
      const text = this.doc.getText();
      const lines = text.substring(0, offset).split('\n');
      line = lines.length - 1;
    }
    
    const lineCodes = this.disabledCodes.lineLevel.get(line);
    if (lineCodes && lineCodes.has(codeStr)) return;

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
