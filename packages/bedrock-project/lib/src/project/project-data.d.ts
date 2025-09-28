import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { DataSetBase, Documents, Pack, TextDocument } from "../types";
import { BehaviorPack, BehaviorPackCollection } from "./behavior-pack";
import { GeneralCollection } from "./general/general";
import { ResourcePack } from "./resource-pack/resource-pack";
import { ResourcePackCollection } from "./resource-pack/resource-pack-collection";
import { WorldPack, WorldPackCollection } from "./world";
/**The project cache for minecraft*/
export declare class ProjectData {
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
    constructor(context: Documents<TextDocument>);
    /**Processes the given textdocument into the bacp
     * @param doc The document to process
     * @returns Returns the possible data the document was added to*/
    process(doc: TextDocument): DataSetBase | undefined;
    /**Returns the specific pack that belongs the document, returns undefined if nothing is found
     * @param doc The document to process*/
    get(doc: TextDocument | string): BehaviorPack | ResourcePack | WorldPack | undefined;
    /** */
    find(predicate: (value: Types.BaseObject) => boolean): Types.BaseObject | undefined;
    /**Checks if the given collection has a given entity
     * @param id The idenfitication of the entity
     * @returns true when it exists, false when it does not*/
    hasEntity(id: string): boolean;
    /**Checks if the given collection has a given block
     * @param id The idenfitication of the block
     * @returns true when it exists, false when it does not*/
    hasBlock(id: string): boolean;
    /**Checks if the given collection has a given item
     * @param id The idenfitication of the item
     * @returns true when it exists, false when it does not*/
    hasItem(id: string): boolean;
    /**
     *
     * @param uri
     */
    deleteFile(uri: string): boolean;
    /**
     *
     * @param uri
     * @returns
     */
    deleteFolder(uri: string): boolean;
    /**
     * Add the given manifest uri to the pack
     * @param manifestUri The uri/filepath to the manifest
     * @param context The path to the context files, or the data itself
     * @returns The pack if its was determine what it was.
     */
    addPack(manifestUri: string, context: string | MCProject): Pack | undefined;
}
