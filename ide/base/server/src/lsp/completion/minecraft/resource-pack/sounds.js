"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideSoundFileCompletion = provideSoundFileCompletion;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../../../constants");
const format_1 = require("../../../../minecraft/format");
const attributes_1 = require("../../../../project/attributes");
const util_1 = require("../../../../util");
const utils_1 = require("../utils");
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined sound', 'The sound');
    const generateV = (item) => `The vanilla sound: ${item}`;
    const data = context.document.configuration();
    // Add sounds from .mcdefinitions
    context.builder.generate(data.definitions.sound?.defined, generateDoc, constants_1.Kinds.Completion.Sound);
    context.builder.generate(context.database.ProjectData.resourcePacks.sounds, generateDoc, constants_1.Kinds.Completion.Sound);
    context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.sounds, generateV, constants_1.Kinds.Completion.Sound);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        context.builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.sounds, generateV, constants_1.Kinds.Completion.Sound);
}
/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
function provideSoundFileCompletion(context) {
    const RP = context.document.pack();
    //No associated pack, then do nothing
    if (!bc_minecraft_bedrock_project_1.ResourcePack.ResourcePack.is(RP))
        return;
    const files = format_1.MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);
    files.forEach((filepath) => {
        const index = filepath.indexOf('sounds');
        if (index <= 0) {
            return;
        }
        const ext = (0, util_1.getExtension)(filepath);
        // Decode URI-encoded paths to handle files with spaces
        const decodedPath = decodeURIComponent(filepath);
        const id = decodedPath.substring(index, decodedPath.length - ext.length);
        context.builder.add({
            label: id,
            documentation: decodedPath,
            kind: vscode_languageserver_1.CompletionItemKind.File,
        });
    });
}
//# sourceMappingURL=sounds.js.map