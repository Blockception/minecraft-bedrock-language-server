"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideJsonCompletion = provideJsonCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
const builder_1 = require("../builder");
function provideJsonCompletion(context) {
    return manifestJsonPaths.onCompletion(context);
}
const manifestJsonPaths = new builder_1.JsonPathCompletion({
    match: 'uuid',
    onCompletion: packUUIDS,
});
function packUUIDS(context) {
    const packs = context.database.getPacks();
    packs.forEach((p) => {
        if (p.manifest.header?.uuid)
            return;
        context.builder.add({
            label: p.manifest.header.name,
            documentation: `Dependency on: ${p.manifest.header.description}\n\rversion: ${JSON.stringify(p.manifest.header.version)}`,
            kind: vscode_languageserver_1.CompletionItemKind.Module,
        });
    });
}
//# sourceMappingURL=manifests.js.map