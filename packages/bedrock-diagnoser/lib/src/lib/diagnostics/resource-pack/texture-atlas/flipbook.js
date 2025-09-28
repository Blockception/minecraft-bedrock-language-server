"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnoseFlipbook = DiagnoseFlipbook;
const json_1 = require("../../json/json");
const entry_1 = require("./entry");
/**Diagnoses the given document as a texture flipbook file
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function DiagnoseFlipbook(diagnoser) {
    const flipbooks = json_1.Json.LoadReport(diagnoser);
    if (flipbooks === undefined)
        return;
    if (!Array.isArray(flipbooks))
        return;
    const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
    if (pack === undefined)
        return;
    const texture_files = diagnoser.context
        .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
        .map((item) => item.replace(/\\/gi, "/"));
    for (let I = 0; I < flipbooks.length; I++) {
        const flipbook = flipbooks[I];
        if (isFlipbook(flipbook)) {
            (0, entry_1.texture_files_diagnose)("flipbook_texture", flipbook.flipbook_texture, texture_files, diagnoser);
        }
    }
}
function isFlipbook(value) {
    if (typeof value === "object") {
        if (typeof value.flipbook_texture === "string")
            return true;
    }
    return false;
}
//# sourceMappingURL=flipbook.js.map