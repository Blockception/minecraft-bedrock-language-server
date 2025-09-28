import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types";
import { Container, DataSetBase, Pack } from "../../types";
import { PackType } from "../pack-type";

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
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);
  }

  /**
   *
   * @param doc
   */
  process(): DataSetBase | undefined {
    this.deleteFile();

    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(): DataSetBase | undefined {
    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(): boolean {
    return false;
  }

  /**
   *
   * @param uri
   */
  deleteFolder(): boolean {
    return false;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(): Types.BaseObject | undefined {
    const value = undefined;

    return value;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  forEach(): void {}
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
    if (typeof value === "object") {
      const temp = <WorldPack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.context !== "object") return false;
      if (typeof temp.folder !== "string") return false;

      return true;
    }

    return false;
  }
}
