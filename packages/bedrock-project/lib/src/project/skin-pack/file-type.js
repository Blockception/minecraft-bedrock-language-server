"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = void 0;
const node_path_1 = __importDefault(require("node:path"));
/** */
var FileType;
(function (FileType) {
    /** */
    FileType[FileType["manifest"] = 0] = "manifest";
    /** */
    FileType[FileType["skins"] = 1] = "skins";
    /** */
    FileType[FileType["texture"] = 2] = "texture";
    /** */
    FileType[FileType["unknown"] = 3] = "unknown";
})(FileType || (exports.FileType = FileType = {}));
/** */
(function (FileType) {
    /**Detects resource pack resource, already assumed the path belongs to a resource pack
     * @param uri the decoded uri, expects slashes to be '/'*/
    function detect(uri) {
        //Folders
        if (uri.endsWith(".png"))
            return FileType.texture;
        const filename = node_path_1.default.basename(uri);
        switch (filename) {
            case "manifest.json":
                return FileType.manifest;
            case "skins.json":
                return FileType.skins;
        }
        return FileType.unknown;
    }
    FileType.detect = detect;
})(FileType || (exports.FileType = FileType = {}));
//# sourceMappingURL=file-type.js.map