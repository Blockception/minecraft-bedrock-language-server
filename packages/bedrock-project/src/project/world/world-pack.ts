
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { MCProject } from 'bc-minecraft-project';
import { Manifest } from '../../internal/types';
import { Container, DataSetBase, Pack, TextDocument } from '../../types';
import { PackType } from '../pack-type';

/** */
export class WorldPack implements Container, Pack {
  readonly type: PackType = PackType.world;
  readonly folder: string;
  readonly context: MCProject;
  readonly manifest: Manifest;

  /**
   * Creates a new instance of WorldPack
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, Context: MCProject | string, manifest: Manifest) {
    this.folder = folder;
    this.manifest = manifest;
    this.context = typeof Context === 'object' ? Context : MCProject.loadSync(Context);
  }

  /**
   * Processes the given document and adds it to the world pack data.
   * @param doc The document to process
   * @returns The dataset the document was added to, or undefined
   * TODO: Implement indexing of world-pack embedded files (behavior_packs / resource_packs sub-folders).
   */
  process(doc: TextDocument): DataSetBase | undefined {
    return undefined;
  }

  /**
   * Returns the dataset that corresponds to the given uri.
   * @param uri The uri of the document
   * @returns The dataset, or undefined
   * TODO: Implement dataset lookup for world-pack embedded files (behavior_packs / resource_packs sub-folders).
   */
  getDataset(uri: string): DataSetBase | undefined {
    return undefined;
  }

  /**
   * Removes the given file from all datasets.
   * @param uri The uri of the file to remove
   * @returns true if any data was removed
   * TODO: Implement file removal for world-pack embedded files (behavior_packs / resource_packs sub-folders).
   */
  deleteFile(uri: string): boolean {
    return false;
  }

  /**
   * Removes all files under the given folder from all datasets.
   * @param uri The uri of the folder to remove
   * @returns true if any data was removed
   * TODO: Implement folder removal for world-pack embedded files (behavior_packs / resource_packs sub-folders).
   */
  deleteFolder(uri: string): boolean {
    return false;
  }

  /**
   * Searches all datasets for the first item matching the predicate.
   * @param predicate The predicate function to match items against
   * @returns The first matching item, or undefined
   * TODO: Implement find for world-pack embedded files (behavior_packs / resource_packs sub-folders).
   */
  find(predicate: (value: BaseObject, key: string) => boolean): BaseObject | undefined {
    return undefined;
  }

  /**
   * Iterates over all items in all datasets.
   * @param callbackfn The callback to invoke for each item
   * TODO: Implement forEach for world-pack embedded files (behavior_packs / resource_packs sub-folders).
   */
  forEach(callbackfn: (value: BaseObject) => void): void {}
}

/**
 *
 */
export namespace WorldPack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is WorldPack {
    if (typeof value === 'object') {
      const temp = <WorldPack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.context !== 'object') return false;
      if (typeof temp.folder !== 'string') return false;

      return true;
    }

    return false;
  }
}
