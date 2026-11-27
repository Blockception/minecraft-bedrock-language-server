
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { MCProject } from 'bc-minecraft-project';
import { Manifest } from '../internal/types';
import { PackType } from '../project/pack-type';
import { TextDocument } from './text-document';

/** */
export interface Pack {
  /**The type of the pack */
  readonly type: PackType;
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;
  /**The manifest of the pack */
  readonly manifest: Manifest;

  /**
   * Processes the given document into this pack's data.
   * @param doc The document to process
   * @returns The uris of other documents whose identifier got overwritten
   * by this document (same id, different location)
   */
  process(doc: TextDocument): string[];

  /**
   *
   * @param uri
   */
  deleteFile(uri: string): boolean;

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean;

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: BaseObject, key: string) => boolean): BaseObject | undefined;

  /**
   *
   * @param callbackfn
   * @returns
   */
  forEach(callbackfn: (value: BaseObject) => boolean): void;
}

/** */
export namespace Pack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Pack {
    if (typeof value === 'object' && typeof value.folder === 'string' && typeof value.process === 'function') {
      return true;
    }

    return false;
  }
}
