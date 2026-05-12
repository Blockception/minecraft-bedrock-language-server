"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeActionBuilder = void 0;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
/** */
class CodeActionBuilder {
    /** */
    params;
    /** */
    out;
    context;
    /** */
    constructor(params, context) {
        this.params = params;
        this.context = context;
        this.out = [];
    }
    /**
     *
     * @returns
     */
    getText(range) {
        return this.context.document.getText(range ?? this.params.range);
    }
    getId(range) {
        const id = this.getText(range);
        return bc_minecraft_bedrock_project_1.Text.UnQuote(id);
    }
    /** */
    push(item) {
        if (item) {
            this.out.push(item);
        }
        return item;
    }
    /**
     *
     * @param title
     * @param commandId
     * @param args
     * @returns
     */
    command(title, commandId, args) {
        const item = { command: commandId, title: title, arguments: args };
        this.out.push(vscode_languageserver_1.CodeAction.create(title, item, vscode_languageserver_1.CodeActionKind.QuickFix));
        return item;
    }
    /**
     * Creates a new action, with the given title
     * @param title
     * @returns
     */
    action(title) {
        const item = {
            title: title,
        };
        this.out.push(item);
        return item;
    }
}
exports.CodeActionBuilder = CodeActionBuilder;
//# sourceMappingURL=builder.js.map