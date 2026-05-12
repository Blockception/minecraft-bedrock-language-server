"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = createCommand;
exports.mustExecute = mustExecute;
const folders_1 = require("../../templates/folders");
const templates_1 = require("./templates");
/**Executes the given creation command */
function createCommand(callback) {
    return async function (context) {
        const folders = (0, folders_1.getFolders)(context);
        return callback(context, folders).then(() => { });
    };
}
function mustExecute(commandId, context, folder, attributes = {}) {
    const t = (0, templates_1.getTemplateCommand)(commandId);
    if (t === undefined)
        throw new Error("couldn't find template command: " + commandId);
    return t.execute(context, folder, attributes);
}
//# sourceMappingURL=functions.js.map