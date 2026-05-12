"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = void 0;
/***/
var FileType;
(function (FileType) {
    /***/
    FileType[FileType["animation"] = 0] = "animation";
    /***/
    FileType[FileType["animation_controller"] = 1] = "animation_controller";
    /***/
    FileType[FileType["biome"] = 2] = "biome";
    /***/
    FileType[FileType["block"] = 3] = "block";
    /***/
    FileType[FileType["dialogue"] = 4] = "dialogue";
    /***/
    FileType[FileType["entity"] = 5] = "entity";
    /***/
    FileType[FileType["feature"] = 6] = "feature";
    /***/
    FileType[FileType["feature_rule"] = 7] = "feature_rule";
    /***/
    FileType[FileType["function"] = 8] = "function";
    /***/
    FileType[FileType["item"] = 9] = "item";
    /***/
    FileType[FileType["item_catalog"] = 10] = "item_catalog";
    /***/
    FileType[FileType["loot_table"] = 11] = "loot_table";
    /***/
    FileType[FileType["manifest"] = 12] = "manifest";
    /***/
    FileType[FileType["script"] = 13] = "script";
    /***/
    FileType[FileType["spawn_rule"] = 14] = "spawn_rule";
    /***/
    FileType[FileType["recipe"] = 15] = "recipe";
    /***/
    FileType[FileType["structure"] = 16] = "structure";
    /***/
    FileType[FileType["trading"] = 17] = "trading";
    /***/
    FileType[FileType["voxel_shape"] = 18] = "voxel_shape";
    /***/
    FileType[FileType["unknown"] = 19] = "unknown";
})(FileType || (exports.FileType = FileType = {}));
(function (FileType) {
    /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
     * @param uri The filepath to examine, expects slashes to be '/'*/
    function detect(uri) {
        if (uri.endsWith('.mcfunction'))
            return FileType.function;
        if (uri.endsWith('.js'))
            return FileType.script;
        //Folders
        if (/[\\/]animation_controllers[\\/]/.test(uri))
            return FileType.animation_controller;
        if (/[\\/]animations[\\/]/.test(uri))
            return FileType.animation;
        if (/[\\/]functions[\\/]/.test(uri))
            return FileType.function;
        if (/[\\/]dialogue[\\/]/.test(uri))
            return FileType.dialogue;
        if (/[\\/]loot_tables[\\/]/.test(uri))
            return FileType.loot_table;
        if (/[\\/]scripts[\\/]/.test(uri))
            return FileType.script;
        if (/[\\/]spawn_rules[\\/]/.test(uri))
            return FileType.spawn_rule;
        if (/[\\/]structures[\\/]/.test(uri))
            return FileType.structure;
        if (/[\\/]trading[\\/]/.test(uri))
            return FileType.trading;
        if (/[\\/]features[\\/]/.test(uri))
            return FileType.feature;
        if (/[\\/]feature_rules[\\/]/.test(uri))
            return FileType.feature_rule;
        if (/[\\/]item_catalog[\\/]/.test(uri))
            return FileType.item_catalog;
        if (/[\\/]biomes[\\/]/.test(uri))
            return FileType.biome;
        if (/[\\/]recipes[\\/]/.test(uri))
            return FileType.recipe;
        if (/[\\/]shapes[\\/]/.test(uri))
            return FileType.voxel_shape;
        //These can also be subfolders
        if (/[\\/]blocks[\\/]/.test(uri))
            return FileType.block;
        if (/[\\/]entities[\\/]/.test(uri))
            return FileType.entity;
        if (/[\\/]items[\\/]/.test(uri))
            return FileType.item;
        //Files
        if (uri.endsWith('manifest.json'))
            return FileType.manifest;
        return FileType.unknown;
    }
    FileType.detect = detect;
})(FileType || (exports.FileType = FileType = {}));
//# sourceMappingURL=file-type.js.map