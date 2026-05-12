"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideModeCompletion = provideModeCompletion;
exports.provideModeCompletionTest = provideModeCompletionTest;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const vscode_languageserver_1 = require("vscode-languageserver");
const expections = {};
/**
 * Provide completion for the given mode
 * @param mode The mode to provide completion for
 * @param context The context to provide completion in
 */
function provideCompletion(mode, context) {
    const func = expections[mode];
    if (func)
        return func(context);
    return provideModeCompletion(bc_minecraft_bedrock_types_1.ModeUtil.getMode(mode), context);
}
/**
 * Provide completion for the given mode
 * @param mode The mode to provide completion for
 * @param context The context to provide completion in
 * @param kind The kind of completion item to provide
 */
function provideModeCompletion(mode, context, kind = vscode_languageserver_1.CompletionItemKind.Property) {
    if (!mode)
        return;
    mode.foreach((m) => {
        let documentation = m.documentation;
        if (m.eduOnly) {
            documentation += '\nThis mode is only available in Education Edition';
        }
        context.builder.add({ label: m.name, documentation, kind });
    });
}
function provideModeCompletionTest(mode, context, kind = vscode_languageserver_1.CompletionItemKind.Property) {
    if (!mode)
        return;
    mode.foreach((m) => {
        let documentation = m.documentation;
        if (m.eduOnly) {
            documentation += '\nThis mode is only available in Education Edition';
        }
        context.builder.add({ label: m.name, documentation, kind });
        context.builder.add({ label: `!${m.name}`, documentation, kind });
    });
}
//# sourceMappingURL=modes.js.map