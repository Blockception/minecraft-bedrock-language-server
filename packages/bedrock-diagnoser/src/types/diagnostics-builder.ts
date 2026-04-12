import { DocumentLocation } from 'bc-minecraft-bedrock-shared';
import { Documents, MinecraftData, TextDocument } from 'bc-minecraft-bedrock-project';
import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { DiagnosticSeverity } from './severity';


/**The context of a diagnostics builder*/
export interface DiagnosticsBuilderContent<T extends TextDocument = TextDocument> extends Documents<T> {
  /**Returns a textdocument object or undefined if something went wrong or nothing exists
   * @param uri The document uri to read*/
  getDocument(uri: string): T | undefined;

  /**Returns all files in the given directory and sub directories.
   * @param folder The folder to start the search from
   * @param patterns The glob patterns that need to match
   * @param ignores The project settings for ignores or includes*/
  getFiles(folder: string, patterns: string[], ignores: MCIgnore): string[];

  /**The project cache data*/
  getProjectData(): MinecraftData;
}

/**The interface of a diagnostics builder*/
export interface DiagnosticsBuilder<T extends TextDocument = TextDocument> {
  /**The context of the given */
  context: DiagnosticsBuilderContent<T>;

  /**The project settings for this given document*/
  project: MCProject;

  /**Adds the diagnostics following message to the specified location in the document.
   * @param position The position in the document to add this message to
   * @param message The message to add
   * @param severity The severity of the issue
   * @param code The code of the diagnostic error
   * @param data Optional data to attach to the diagnostic (e.g. a replacement string for quick fixes)*/
  add(position: DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number, data?: unknown): void;
}

/** The interface of a diagnostics builder for a document*/
export interface DocumentDiagnosticsBuilder<T extends TextDocument = TextDocument> extends DiagnosticsBuilder<T> {
  /**The document to add the diagnostics to*/
  document: T;

  /**Lazily-cached parsed content of the document (populated on first JSON parse, shared across all diagnostics in a single pass)*/
  parsedContent?: unknown;
}

/**A typed variant of DocumentDiagnosticsBuilder for use when the parsed JSON content type is known*/
export interface JsonDocumentDiagnosticsBuilder<TDoc extends TextDocument = TextDocument, TContent = unknown>
  extends DocumentDiagnosticsBuilder<TDoc> {
  /**The parsed JSON content of the document*/
  parsedContent: TContent;
}

export namespace DocumentDiagnosticsBuilder {
  export function wrap<T extends TextDocument = TextDocument>(
    diagnoser: DiagnosticsBuilder<T>,
    document: T,
  ): DocumentDiagnosticsBuilder<T> {
    const diag = diagnoser as DocumentDiagnosticsBuilder<T>;
    diag.document = document;
    return diag;
  }
}

export interface Metadata<T> {
  metadata: T;
}

export type WithMetadata<T extends object, M> = T & Metadata<M>;

export namespace Metadata {
  export function withMetadata<T extends object, M>(source: T, metadata: M): WithMetadata<T, M> {
    const result = source as WithMetadata<T, M>;
    result['metadata'] = metadata;
    return result;
  }
}
