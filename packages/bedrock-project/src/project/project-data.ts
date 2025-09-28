import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../internal/types/manifest";
import { DataSetBase, Documents, Pack, TextDocument } from "../types";
import { BehaviorPack, BehaviorPackCollection, FileType } from "./behavior-pack";
import { GeneralCollection } from "./general/general";
import {
  ProcessAnimationCommands,
  ProcessAnimationControllerCommands,
  ProcessMcFunction,
  processEntityCommands,
} from "./general/types/commands/process";
import { PackType } from "./pack-type";
import { ResourcePack } from "./resource-pack/resource-pack";
import { ResourcePackCollection } from "./resource-pack/resource-pack-collection";
import { WorldPack, WorldPackCollection } from "./world";

/**The project cache for minecraft*/
export class ProjectData {
  /**The collection of behavior packs*/
  behaviorPacks: BehaviorPackCollection;
  /**The collection of resource packs*/
  resourcePacks: ResourcePackCollection;
  /**The collection of worlds*/
  worlds: WorldPackCollection;
  /**The collection of general items*/
  general: GeneralCollection;
  /**The context needed to run this project data collection*/
  documents: Documents<TextDocument>;

  constructor(context: Documents<TextDocument>) {
    this.behaviorPacks = new BehaviorPackCollection();
    this.resourcePacks = new ResourcePackCollection();
    this.general = new GeneralCollection();
    this.worlds = new WorldPackCollection();
    this.documents = context;
  }

  /**Processes the given textdocument into the bacp
   * @param doc The document to process
   * @returns Returns the possible data the document was added to*/
  process(doc: TextDocument): DataSetBase | undefined {
    const type = PackType.detect(doc.uri);

    switch (type) {
      case PackType.behavior_pack:
        const out = this.behaviorPacks.process(doc);

        //Pre process Commands
        switch (FileType.detect(doc.uri)) {
          case FileType.function:
            ProcessMcFunction(doc, this.general);
            break;

          case FileType.animation:
            ProcessAnimationCommands(doc, this.general);
            break;

          case FileType.animation_controller:
            ProcessAnimationControllerCommands(doc, this.general);
            break;

          case FileType.entity:
            processEntityCommands(doc, this.general);
            break;
        }

        return out;

      case PackType.resource_pack:
        return this.resourcePacks.process(doc);

      case PackType.world:
        return this.worlds.process(doc);
    }

    return undefined;
  }

  /**Returns the specific pack that belongs the document, returns undefined if nothing is found
   * @param doc The document to process*/
  get(doc: TextDocument | string): BehaviorPack | ResourcePack | WorldPack | undefined {
    let out: BehaviorPack | ResourcePack | WorldPack | undefined;
    if ((out = this.behaviorPacks.get(doc))) return out;
    if ((out = this.resourcePacks.get(doc))) return out;
    if ((out = this.worlds.get(doc))) return out;

    return undefined;
  }

  /** */
  find(predicate: (value: Types.BaseObject) => boolean): Types.BaseObject | undefined {
    let value = undefined;

    if ((value = this.behaviorPacks.find(predicate))) return value;
    if ((value = this.resourcePacks.find(predicate))) return value;
    if ((value = this.general.find(predicate))) return value;
    if ((value = this.worlds.find(predicate))) return value;

    return undefined;
  }

  /**Checks if the given collection has a given entity
   * @param id The idenfitication of the entity
   * @returns true when it exists, false when it does not*/
  hasEntity(id: string): boolean {
    if (this.behaviorPacks.entities.has(id) || this.resourcePacks.entities.has(id)) return true;

    return false;
  }

  /**Checks if the given collection has a given block
   * @param id The idenfitication of the block
   * @returns true when it exists, false when it does not*/
  hasBlock(id: string): boolean {
    if (this.behaviorPacks.blocks.has(id)) return true;

    return false;
  }

  /**Checks if the given collection has a given item
   * @param id The idenfitication of the item
   * @returns true when it exists, false when it does not*/
  hasItem(id: string): boolean {
    if (this.behaviorPacks.items.has(id)) return true;

    return false;
  }

  /**
   *
   * @param uri
   */
  deleteFile(uri: string): boolean {
    let out = false;

    out = this.behaviorPacks.deleteFile(uri) || out;
    out = this.general.deleteFile(uri) || out;
    out = this.resourcePacks.deleteFile(uri) || out;

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out = this.behaviorPacks.deleteFolder(uri) || out;
    out = this.general.deleteFolder(uri) || out;
    out = this.resourcePacks.deleteFolder(uri) || out;

    return out;
  }

  /**
   * Add the given manifest uri to the pack
   * @param manifestUri The uri/filepath to the manifest
   * @param context The path to the context files, or the data itself
   * @returns The pack if its was determine what it was.
   */
  addPack(manifestUri: string, context: string | MCProject): Pack | undefined {
    const manifest = Manifest.getManifest(manifestUri, this.documents.getDocument.bind(this.documents));
    if (!manifest) return;

    const types = Manifest.detectTypeUri(manifestUri, manifest);
    const parent = manifestUri.replace(/[\\/]manifest.json/gi, "");

    switch (types) {
      case PackType.behavior_pack:
        return this.behaviorPacks.add(parent, context, manifest);

      case PackType.resource_pack:
        return this.resourcePacks.add(parent, context, manifest);

      case PackType.world:
        return this.worlds.add(parent, context, manifest);

      case PackType.skin_pack:
      case PackType.unknown:
      default:
        return undefined;
    }

    return undefined;
  }
}
