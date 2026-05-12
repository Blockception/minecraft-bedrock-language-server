"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../../../minecraft/json/raw-text/constants");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: vscode_languageserver_1.CompletionItemKind.Snippet });
    builder.add({ label: 'Json Raw Text', documentation: constants_1.cRawTextComponent, insertText: constants_1.cRawTextComponent });
    builder.add({ label: 'Json Raw Text example', documentation: constants_1.cRawTextExample, insertText: constants_1.cRawTextExample });
    builder.add({
        label: 'Translation component',
        documentation: constants_1.cTranslationComponent,
        insertText: constants_1.cTranslationComponent,
    });
    builder.add({ label: 'Translation component, with', documentation: constants_1.cTranslationWith, insertText: constants_1.cTranslationWith });
    builder.add({
        label: 'Translation component, with complex',
        documentation: constants_1.cTranslationWithComplex,
        insertText: constants_1.cTranslationWithComplex,
    });
    builder.add({ label: 'Text component', documentation: constants_1.cTextComponent, insertText: constants_1.cTextComponent });
    builder.add({ label: 'Score component', documentation: constants_1.cScoreComponent, insertText: constants_1.cScoreComponent });
    builder.add({ label: 'Selector component', documentation: constants_1.cSelectorComponent, insertText: constants_1.cSelectorComponent });
}
//# sourceMappingURL=rawtext.js.map