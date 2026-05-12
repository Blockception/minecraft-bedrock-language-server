"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProject = storeProject;
const fs_1 = require("fs");
const util_1 = require("../../../util");
const util_2 = require("../util");
const io_1 = require("../../../io/io");
const path_1 = __importDefault(require("path"));
async function storeProject(context) {
    const { logger, database } = context;
    const workspaceProcessor = (0, util_2.getWorkspace)(context);
    const ws = await workspaceProcessor.get();
    if (ws === undefined || ws === null) {
        throw new Error("couldn't find workspaces");
    }
    const folder = util_1.Fs.FromVscode(ws[0].uri);
    const outputfolder = path_1.default.join(folder, '.minecraft');
    if (!(0, io_1.exists)(outputfolder, context.logger))
        (0, fs_1.mkdirSync)(outputfolder);
    database.ProjectData.behaviorPacks.packs.forEach(createGenerator(logger, 'bp_pack', outputfolder));
    database.ProjectData.resourcePacks.packs.forEach(createGenerator(logger, 'rp_pack', outputfolder));
    database.WorkspaceData.forEach(createGenerator(logger, 'workspace', outputfolder));
    database.ProjectData.general.forEach(createGenerator(logger, 'general', outputfolder));
}
function createGenerator(logger, type, outputfolder) {
    let count = 0;
    return function (data) {
        const filepath = path_1.default.join(outputfolder, `${type}_${count++}.json`);
        convertStore(logger, filepath, data);
    };
}
function convertStore(logger, filepath, data) {
    const temp = {};
    convert(data, temp);
    storeObject(logger, filepath, temp);
}
function convert(data, receiver) {
    const names = Object.getOwnPropertyNames(data);
    for (let I = 0; I < names.length; I++) {
        const name = names[I];
        const value = data[name];
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            receiver[name] = value;
        }
        else if (value.forEach) {
            const values = [];
            value.forEach((item) => values.push(item));
            receiver[name] = values;
        }
        else if (typeof value === 'object') {
            receiver[name] = value;
        }
    }
}
function storeObject(logger, path, data) {
    try {
        const content = JSON.stringify(data);
        (0, fs_1.writeFileSync)(path, content);
    }
    catch (err) {
        logger.recordError(err);
    }
}
//# sourceMappingURL=store-project.js.map