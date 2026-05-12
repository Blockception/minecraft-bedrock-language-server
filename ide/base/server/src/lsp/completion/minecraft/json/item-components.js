"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../../../minecraft/json/item-components/constants");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: vscode_languageserver_1.CompletionItemKind.Snippet });
    builder.add({
        label: 'Json Item Components Example',
        documentation: constants_1.Example,
        insertText: constants_1.Example,
    });
    builder.add({
        label: 'Can destroy component',
        documentation: constants_1.CanDestroyComponent,
        insertText: constants_1.CanDestroyComponent,
    });
    builder.add({
        label: 'Can place on component',
        documentation: constants_1.CanPlaceOnComponent,
        insertText: constants_1.CanPlaceOnComponent,
    });
    builder.add({
        label: 'Lock in inventory component',
        documentation: constants_1.LockInInventoryComponent,
        insertText: constants_1.LockInInventoryComponent,
    });
    builder.add({
        label: 'Keep on death component',
        documentation: constants_1.KeepOnDeathComponent,
        insertText: constants_1.KeepOnDeathComponent,
    });
    builder.add({
        label: 'Lock in slot component',
        documentation: constants_1.LockInSlotComponent,
        insertText: constants_1.LockInSlotComponent,
    });
}
//# sourceMappingURL=item-components.js.map