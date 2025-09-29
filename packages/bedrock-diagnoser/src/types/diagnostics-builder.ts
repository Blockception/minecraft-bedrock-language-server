import { DiagnosticSeverity } from './severity';
import { TextDocument, MinecraftData, Documents } from 'bc-minecraft-bedrock-project';
import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { Types } from 'bc-minecraft-bedrock-types';

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
   * @param code The code of the diagnostic error*/
  add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void;
}

/** The interface of a diagnostics builder for a document*/
export interface DocumentDiagnosticsBuilder<T extends TextDocument = TextDocument> extends DiagnosticsBuilder<T> {
  /**The document to add the diagnostics to*/
  document: T;
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
