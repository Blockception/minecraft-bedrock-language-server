"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = void 0;
const path_1 = __importDefault(require("path"));
/** */
var FileType;
(function (FileType) {
    /** */
    FileType[FileType["animation"] = 0] = "animation";
    /** */
    FileType[FileType["animation_controller"] = 1] = "animation_controller";
    /** */
    FileType[FileType["attachable"] = 2] = "attachable";
    /** */
    FileType[FileType["block_culling_rules"] = 3] = "block_culling_rules";
    /**The file biomes_client */
    FileType[FileType["biomes_client"] = 4] = "biomes_client";
    /** */
    FileType[FileType["block"] = 5] = "block";
    /** */
    FileType[FileType["entity"] = 6] = "entity";
    /** */
    FileType[FileType["fog"] = 7] = "fog";
    /** */
    FileType[FileType["item"] = 8] = "item";
    /** */
    FileType[FileType["manifest"] = 9] = "manifest";
    /** */
    FileType[FileType["material"] = 10] = "material";
    /** */
    FileType[FileType["model"] = 11] = "model";
    /** */
    FileType[FileType["music_definitions"] = 12] = "music_definitions";
    /** */
    FileType[FileType["particle"] = 13] = "particle";
    /** */
    FileType[FileType["render_controller"] = 14] = "render_controller";
    /** */
    FileType[FileType["sounds"] = 15] = "sounds";
    /**The file sound_definitions*/
    FileType[FileType["sounds_definitions"] = 16] = "sounds_definitions";
    /** */
    FileType[FileType["texture"] = 17] = "texture";
    /** */
    FileType[FileType["texture_flipbook_atlas"] = 18] = "texture_flipbook_atlas";
    /**The file texture_item_atlas*/
    FileType[FileType["texture_item_atlas"] = 19] = "texture_item_atlas";
    /**The file terrain_texture.json */
    FileType[FileType["texture_terrain_atlas"] = 20] = "texture_terrain_atlas";
    /** */
    FileType[FileType["unknown"] = 21] = "unknown";
})(FileType || (exports.FileType = FileType = {}));
/** */
(function (FileType) {
    /**Detects resource pack resource, already assumed the path belongs to a resource pack
     * @param uri the decoded uri, expects slashes to be '/'*/
    function detect(uri) {
        //Folders
        if (/[\\/]animation_controllers[\\/]/.test(uri))
            return FileType.animation_controller;
        if (/[\\/]animations[\\/]/.test(uri))
            return FileType.animation;
        if (/[\\/]attachables[\\/]/.test(uri))
            return FileType.attachable;
        if (/[\\/]block_culling[\\/]/.test(uri))
            return FileType.block_culling_rules;
        if (/[\\/]models[\\/]/.test(uri))
            return FileType.model;
        if (/[\\/]models[\\/]entities[\\/]/.test(uri))
            return FileType.model;
        if (/[\\/]entity[\\/]/.test(uri))
            return FileType.entity;
        if (/[\\/]particles[\\/]/.test(uri))
            return FileType.particle;
        if (/[\\/]render_controllers[\\/]/.test(uri))
            return FileType.render_controller;
        const filename = path_1.default.basename(uri);
        switch (filename) {
            case "biomes_client.json":
                return FileType.biomes_client;
            case "blocks.json":
                return FileType.block;
            case "flipbook_textures.json":
                return FileType.texture_flipbook_atlas;
            case "item_texture.json":
                return FileType.texture_item_atlas;
            case "manifest.json":
                return FileType.manifest;
            case "music_definitions.json":
                return FileType.music_definitions;
            case "sound_definitions.json":
                return FileType.sounds_definitions;
            case "sounds.json":
                return FileType.sounds;
            case "terrain_texture.json":
                return FileType.texture_terrain_atlas;
        }
        if (/[\\/]textures[\\/]/.test(uri))
            return FileType.texture;
        return FileType.unknown;
    }
    FileType.detect = detect;
})(FileType || (exports.FileType = FileType = {}));
//# sourceMappingURL=file-type.js.map