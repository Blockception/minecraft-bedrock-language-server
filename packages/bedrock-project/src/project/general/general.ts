import { Types } from "bc-minecraft-bedrock-types";
import { DataSet, TextDocument } from "../../types";
import { FileType } from "../behavior-pack";
import { ProcessMcFunction } from "./types/commands/process";
import { GeneralInfo } from "./types/general-info";

/**The class GeneralCollection description*/
export class GeneralCollection {
  /** */
  readonly fakeEntities: DataSet<GeneralInfo>;
  /** */
  readonly objectives: DataSet<GeneralInfo>;
  /** */
  readonly structures: DataSet<GeneralInfo>;
  /** */
  readonly tags: DataSet<GeneralInfo>;
  /** */
  readonly tickingAreas: DataSet<GeneralInfo>;

  constructor() {
    this.fakeEntities = new DataSet();
    this.objectives = new DataSet();
    this.structures = new DataSet();
    this.tags = new DataSet();
    this.tickingAreas = new DataSet();
  }

  /**
   *
   * @param doc
   * @returns
   */
  process(doc: TextDocument) {
    const type = FileType.detect(doc.uri);

    switch (type) {
      case FileType.function:
        return ProcessMcFunction(doc, this);

      default:
        return this;
    }
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string) {
    let out = false;
    out = this.fakeEntities.deleteFile(uri) || out;
    out = this.objectives.deleteFile(uri) || out;
    out = this.tags.deleteFile(uri) || out;
    out = this.tickingAreas.deleteFile(uri) || out;

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;
    out = this.fakeEntities.deleteFolder(uri) || out;
    out = this.objectives.deleteFolder(uri) || out;
    out = this.tags.deleteFolder(uri) || out;
    out = this.tickingAreas.deleteFolder(uri) || out;

    return out;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: Types.BaseObject, key: string) => boolean): Types.BaseObject | undefined {
    let value = undefined;

    if ((value = this.fakeEntities.find(predicate))) return value;
    if ((value = this.objectives.find(predicate))) return value;
    if ((value = this.structures.find(predicate))) return value;
    if ((value = this.tags.find(predicate))) return value;
    if ((value = this.tickingAreas.find(predicate))) return value;

    return value;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  forEach(callbackfn: (value: Types.BaseObject) => void): void {
    this.fakeEntities.forEach(callbackfn);
    this.objectives.forEach(callbackfn);
    this.structures.forEach(callbackfn);
    this.tags.forEach(callbackfn);
    this.tickingAreas.forEach(callbackfn);
  }
}
