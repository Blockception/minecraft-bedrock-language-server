"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_language_files = create_language_files;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const language_1 = require("../commands/commands/language");
const languages_1 = require("./definitions/languages");
const path = __importStar(require("path"));
/**
 *
 * @param pack
 * @param builder
 */
function create_language_files(pack, builder, additional) {
    if (typeof pack === 'string') {
        const nPack = builder.context.database.ProjectData.get(pack);
        if (nPack === undefined)
            return;
        pack = nPack;
    }
    const baseFolder = path.join(pack.folder, 'texts');
    internalCreate(baseFolder, builder, 'languages.json', JSON.stringify(languages_1.LanguageNames, undefined, 2));
    let content = languages_1.LanguageContent;
    const textBuilder = new language_1.TextEditBuilder(undefined);
    if (bc_minecraft_bedrock_project_1.Util.IsResourcePack(pack)) {
        (0, language_1.generate_rp)(pack, textBuilder);
    }
    else if (bc_minecraft_bedrock_project_1.Util.IsBehaviorPack(pack)) {
        (0, language_1.generate_bp)(pack, textBuilder);
    }
    else if (bc_minecraft_bedrock_project_1.Util.IsWorldPack(pack)) {
        (0, language_1.generate_wp)();
    }
    if (additional !== undefined) {
        additional(textBuilder);
    }
    content += textBuilder.out;
    for (let I = 0; I < languages_1.LanguageNames.length; I++) {
        internalCreate(baseFolder, builder, `${languages_1.LanguageNames[I]}.lang`, content);
    }
}
function internalCreate(BaseFolder, Builder, Name, Content) {
    const uri = path.join(BaseFolder, Name);
    Builder.createFile(uri, Content);
}
//# sourceMappingURL=language.js.map