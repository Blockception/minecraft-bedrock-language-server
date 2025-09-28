"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnoser = void 0;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const severity_1 = require("./severity");
const format_1 = require("../diagnostics/format");
const minecraft_1 = require("../diagnostics/minecraft");
const behavior_pack_1 = require("../diagnostics/behavior-pack");
const resource_pack_1 = require("../diagnostics/resource-pack");
const skin_pack_1 = require("../diagnostics/skin-pack/skin-pack");
const world_pack_1 = require("../diagnostics/world-pack/world-pack");
const path_1 = __importDefault(require("path"));
/**The object that is responsible for diagnosing minecraft bedrock files*/
class Diagnoser {
    /**Create a new instance of Diagnoser
     * @param context The context needed to perform diagnostics*/
    constructor(context) {
        this.context = context;
    }
    /** process and diagnoses the given document
     * @param doc The textdocument to process or the uri to the document
     * @returns `true` or `false` if the diagnostics was successfully*/
    process(doc) {
        if (typeof doc === "string") {
            const temp = this.context.getDocument(doc);
            if (!temp)
                return false;
            doc = temp;
        }
        const pack = this.context.getProjectData().projectData.get(doc);
        if (!pack)
            return false;
        //Check if diagnostics was disabled
        const ext = path_1.default.extname(doc.uri);
        //Check if diagnostics for this file type is disabled
        if (pack.context.attributes["diagnostic" + ext] === "false")
            return false;
        const diagnoser = this.context.getDiagnoser(doc, pack.context);
        if (!diagnoser)
            return false;
        diagnoser.document = doc;
        let out = false;
        try {
            //diagnose path
            (0, format_1.format_diagnose_path)(pack, doc.uri, diagnoser);
            //Language file?
            if (doc.uri.endsWith(".lang")) {
                (0, minecraft_1.diagnose_language_document)(diagnoser, pack.type);
            }
            else {
                //Check per pack
                switch (pack.type) {
                    case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
                        out = behavior_pack_1.BehaviorPack.diagnose_document(diagnoser);
                        break;
                    case bc_minecraft_bedrock_project_1.PackType.resource_pack:
                        out = resource_pack_1.ResourcePack.diagnose_document(diagnoser);
                        break;
                    case bc_minecraft_bedrock_project_1.PackType.skin_pack:
                        out = skin_pack_1.SkinPack.diagnose_document(diagnoser);
                        break;
                    case bc_minecraft_bedrock_project_1.PackType.world:
                        out = world_pack_1.WorldPack.diagnose_document(diagnoser);
                        break;
                }
            }
        }
        catch (err) {
            let msg;
            if (err.message && err.stack) {
                msg = `${err.message}\n\t${err.stack}`;
            }
            else {
                msg = JSON.stringify(err);
            }
            diagnoser.add({ character: 0, line: 0 }, msg, severity_1.DiagnosticSeverity.error, "debugger.internal.exception");
        }
        diagnoser.done();
        return out;
    }
    /**Diagnoses the entire given folder
     * @param folder The folder to retrieve files of
     * @param ignores The pattern to ignore on files*/
    processFolder(folder, ignores) {
        const files = this.context.getFiles(folder, ["*"], ignores);
        let out = false;
        for (let I = 0; I < files.length; I++) {
            out = this.process(files[I]) || out;
        }
        return out;
    }
    /**process the entire given pack
     * @param pack The pack to process
     * @returns True or false is something was processed*/
    processPack(pack) {
        return this.processFolder(pack.folder, pack.context.ignores);
    }
}
exports.Diagnoser = Diagnoser;
//# sourceMappingURL=diagnoser.js.map