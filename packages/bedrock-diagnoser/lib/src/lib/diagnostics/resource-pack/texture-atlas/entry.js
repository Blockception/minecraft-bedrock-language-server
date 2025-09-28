"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_atlas_document = diagnose_atlas_document;
exports.texture_files_diagnose = texture_files_diagnose;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const path_1 = __importDefault(require("path"));
const types_1 = require("../../../types");
const definitions_1 = require("../../definitions");
const json_1 = require("../../json/json");
/**Diagnoses the given document as a texture atlas
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_atlas_document(diagnoser) {
    const definitions = json_1.Json.LoadReport(diagnoser);
    if (!TextureAtlas.is(definitions))
        return;
    //Get pack for files search
    const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
    if (pack === undefined)
        return;
    const texture_data = definitions.texture_data;
    const texture_files = diagnoser.context
        .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
        .map((item) => item.replace(/\\/gi, "/"));
    //Check if files exists
    const check_file_spec = (texture_id, item) => {
        if (typeof item.path === "string") {
            texture_files_diagnose(texture_id, item.path, texture_files, diagnoser);
        }
        if (item.variations) {
            item.variations.forEach((subitem) => {
                if (typeof subitem.path === "string") {
                    texture_files_diagnose(texture_id, subitem.path, texture_files, diagnoser);
                }
            });
        }
    };
    Object.entries(texture_data).forEach(([texture_id, data]) => {
        const textures = data.textures;
        //If texture
        if (typeof textures === "string") {
            texture_files_diagnose(texture_id, textures, texture_files, diagnoser);
            //If array of items
        }
        else if (Array.isArray(textures)) {
            textures.forEach((texture) => {
                if (typeof texture === "string") {
                    texture_files_diagnose(texture_id, texture, texture_files, diagnoser);
                }
                else {
                    check_file_spec(texture_id, texture);
                }
            });
        }
        else {
            check_file_spec(texture_id, data.textures);
        }
    });
}
function texture_files_diagnose(owner, file, files, diagnoser) {
    files = files.map((location) => location.includes(".") ? location.slice(0, -path_1.default.extname(location).length) : location);
    if (file.includes("."))
        file = file.slice(0, -path_1.default.extname(file).length);
    for (let I = 0; I < files.length; I++) {
        if (files[I].endsWith(file)) {
            //Found then return
            return;
        }
    }
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.hasTexture(file, (0, definitions_1.education_enabled)(diagnoser)))
        return;
    diagnoser.add(`${owner}/${file}`, `Cannot find file: ${file}`, types_1.DiagnosticSeverity.error, "resourcepack.texture.missing");
}
var TextureAtlas;
(function (TextureAtlas) {
    function is(value) {
        if (typeof value === "object" && typeof value.texture_data === "object")
            return true;
        return false;
    }
    TextureAtlas.is = is;
})(TextureAtlas || (TextureAtlas = {}));
//# sourceMappingURL=entry.js.map