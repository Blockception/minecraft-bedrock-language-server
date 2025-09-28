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
    FileType[FileType["entity"] = 4] = "entity";
    /***/
    FileType[FileType["feature"] = 5] = "feature";
    /***/
    FileType[FileType["feature_rule"] = 6] = "feature_rule";
    /***/
    FileType[FileType["function"] = 7] = "function";
    /***/
    FileType[FileType["item"] = 8] = "item";
    /***/
    FileType[FileType["item_catalog"] = 9] = "item_catalog";
    /***/
    FileType[FileType["loot_table"] = 10] = "loot_table";
    /***/
    FileType[FileType["manifest"] = 11] = "manifest";
    /***/
    FileType[FileType["script"] = 12] = "script";
    /***/
    FileType[FileType["spawn_rule"] = 13] = "spawn_rule";
    /***/
    FileType[FileType["recipe"] = 14] = "recipe";
    /***/
    FileType[FileType["structure"] = 15] = "structure";
    /***/
    FileType[FileType["trading"] = 16] = "trading";
    /***/
    FileType[FileType["unknown"] = 17] = "unknown";
})(FileType || (exports.FileType = FileType = {}));
(function (FileType) {
    /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
     * @param uri The filepath to examine, expects slashes to be '/'*/
    function detect(uri) {
        if (uri.endsWith(".mcfunction"))
            return FileType.function;
        if (uri.endsWith(".js"))
            return FileType.script;
        //Folders
        if (/[\\/]animation_controllers[\\/]/.test(uri))
            return FileType.animation_controller;
        if (/[\\/]animations[\\/]/.test(uri))
            return FileType.animation;
        if (/[\\/]functions[\\/]/.test(uri))
            return FileType.function;
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
        //These can also be subfolders
        if (/[\\/]blocks[\\/]/.test(uri))
            return FileType.block;
        if (/[\\/]entities[\\/]/.test(uri))
            return FileType.entity;
        if (/[\\/]items[\\/]/.test(uri))
            return FileType.item;
        //Files
        if (uri.endsWith("manifest.json"))
            return FileType.manifest;
        return FileType.unknown;
    }
    FileType.detect = detect;
})(FileType || (exports.FileType = FileType = {}));
//# sourceMappingURL=file-type.js.map