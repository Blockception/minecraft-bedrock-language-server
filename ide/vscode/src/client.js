"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const bc_minecraft_lsp_client_1 = require("bc-minecraft-lsp-client");
function activate(context) {
    (0, bc_minecraft_lsp_client_1.setupCommands)(context);
    (0, bc_minecraft_lsp_client_1.setupClient)(context);
}
//shutdown server
function deactivate() {
    console.log('stopping minecraft language client');
    if (!bc_minecraft_lsp_client_1.Manager.Client) {
        return undefined;
    }
    return bc_minecraft_lsp_client_1.Manager.Client.stop();
}
//# sourceMappingURL=client.js.map