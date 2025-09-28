"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectData = void 0;
const manifest_1 = require("../internal/types/manifest");
const behavior_pack_1 = require("./behavior-pack");
const general_1 = require("./general/general");
const process_1 = require("./general/types/commands/process");
const pack_type_1 = require("./pack-type");
const resource_pack_collection_1 = require("./resource-pack/resource-pack-collection");
const world_1 = require("./world");
/**The project cache for minecraft*/
class ProjectData {
    constructor(context) {
        this.behaviorPacks = new behavior_pack_1.BehaviorPackCollection();
        this.resourcePacks = new resource_pack_collection_1.ResourcePackCollection();
        this.general = new general_1.GeneralCollection();
        this.worlds = new world_1.WorldPackCollection();
        this.documents = context;
    }
    /**Processes the given textdocument into the bacp
     * @param doc The document to process
     * @returns Returns the possible data the document was added to*/
    process(doc) {
        const type = pack_type_1.PackType.detect(doc.uri);
        switch (type) {
            case pack_type_1.PackType.behavior_pack:
                const out = this.behaviorPacks.process(doc);
                //Pre process Commands
                switch (behavior_pack_1.FileType.detect(doc.uri)) {
                    case behavior_pack_1.FileType.function:
                        (0, process_1.ProcessMcFunction)(doc, this.general);
                        break;
                    case behavior_pack_1.FileType.animation:
                        (0, process_1.ProcessAnimationCommands)(doc, this.general);
                        break;
                    case behavior_pack_1.FileType.animation_controller:
                        (0, process_1.ProcessAnimationControllerCommands)(doc, this.general);
                        break;
                    case behavior_pack_1.FileType.entity:
                        (0, process_1.processEntityCommands)(doc, this.general);
                        break;
                }
                return out;
            case pack_type_1.PackType.resource_pack:
                return this.resourcePacks.process(doc);
            case pack_type_1.PackType.world:
                return this.worlds.process(doc);
        }
        return undefined;
    }
    /**Returns the specific pack that belongs the document, returns undefined if nothing is found
     * @param doc The document to process*/
    get(doc) {
        let out;
        if ((out = this.behaviorPacks.get(doc)))
            return out;
        if ((out = this.resourcePacks.get(doc)))
            return out;
        if ((out = this.worlds.get(doc)))
            return out;
        return undefined;
    }
    /** */
    find(predicate) {
        let value = undefined;
        if ((value = this.behaviorPacks.find(predicate)))
            return value;
        if ((value = this.resourcePacks.find(predicate)))
            return value;
        if ((value = this.general.find(predicate)))
            return value;
        if ((value = this.worlds.find(predicate)))
            return value;
        return undefined;
    }
    /**Checks if the given collection has a given entity
     * @param id The idenfitication of the entity
     * @returns true when it exists, false when it does not*/
    hasEntity(id) {
        if (this.behaviorPacks.entities.has(id) || this.resourcePacks.entities.has(id))
            return true;
        return false;
    }
    /**Checks if the given collection has a given block
     * @param id The idenfitication of the block
     * @returns true when it exists, false when it does not*/
    hasBlock(id) {
        if (this.behaviorPacks.blocks.has(id))
            return true;
        return false;
    }
    /**Checks if the given collection has a given item
     * @param id The idenfitication of the item
     * @returns true when it exists, false when it does not*/
    hasItem(id) {
        if (this.behaviorPacks.items.has(id))
            return true;
        return false;
    }
    /**
     *
     * @param uri
     */
    deleteFile(uri) {
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
    deleteFolder(uri) {
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
    addPack(manifestUri, context) {
        const manifest = manifest_1.Manifest.getManifest(manifestUri, this.documents.getDocument.bind(this.documents));
        if (!manifest)
            return;
        const types = manifest_1.Manifest.detectTypeUri(manifestUri, manifest);
        const parent = manifestUri.replace(/[\\/]manifest.json/gi, "");
        switch (types) {
            case pack_type_1.PackType.behavior_pack:
                return this.behaviorPacks.add(parent, context, manifest);
            case pack_type_1.PackType.resource_pack:
                return this.resourcePacks.add(parent, context, manifest);
            case pack_type_1.PackType.world:
                return this.worlds.add(parent, context, manifest);
            case pack_type_1.PackType.skin_pack:
            case pack_type_1.PackType.unknown:
            default:
                return undefined;
        }
        return undefined;
    }
}
exports.ProjectData = ProjectData;
//# sourceMappingURL=project-data.js.map