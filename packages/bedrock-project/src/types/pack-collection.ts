import { BaseObject } from 'bc-minecraft-bedrock-types';
import { DataSetBase } from './data-set';
import { findInPacks } from './find-in-packs';
import { Pack } from './pack';
import { TextDocument } from './text-document';

/**The class PackCollection description*/
export class PackCollection<T extends Pack> {
  /** */
  public packs: T[];

  /**Creates a new instances of the class*/
  constructor() {
    this.packs = [];
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetBase | undefined {
    const pack = this.get(doc);

    if (pack) {
      return pack.process(doc);
    }

    return undefined;
  }

  /** */
  count(): number {
    return this.packs.length;
  }

  /**
   *
   * @param doc
   * @returns
   */
  get(doc: TextDocument | string): T | undefined {
    const uri = typeof doc === 'string' ? doc : doc.uri;

    return findInPacks(this.packs, (pack) => (uri.startsWith(pack.folder) ? pack : undefined));
  }

  /**
   *
   * @param folder
   * @returns
   */
  delete(folder: string): boolean {
    const old = this.packs.length;

    this.packs = this.packs.filter((value) => value.folder !== folder);

    return old !== this.packs.length;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    const p = this.get(uri);

    if (p) return p.deleteFile(uri);

    return false;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    //If the folder that has been deleted is a pack, then the pack will have been removed
    out = this.delete(uri) || out;

    //Checks if the folder is inside the pack
    const p = this.get(uri);
    if (p) out = p.deleteFolder(uri) || out;

    return out;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: BaseObject, key: string) => boolean): BaseObject | undefined {
    return findInPacks(this.packs, (pack) => pack.find(predicate));
  }
}
