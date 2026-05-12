"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceData = void 0;
const mcprojects_1 = require("../../project/mcprojects");
/**
 *
 */
class WorkspaceData {
    /**<Workspace Uri, Project Data> */
    _data;
    constructor() {
        this._data = new Map();
    }
    /**
     *
     * @param uri
     */
    getProject(docUri, settings) {
        //Find most matching data
        for (const [key, data] of this._data) {
            if (docUri.includes(key)) {
                const out = data;
                if (out)
                    return out;
                break;
            }
        }
        return (0, mcprojects_1.getProjectEmpty)(settings);
    }
    /**Gets the workspace folder that corresponds to the given document
     * @param uri The document uri to compare*/
    getFolder(docUri) {
        //Find most matching data
        for (const [key] of this._data) {
            if (docUri.includes(key)) {
                return key;
            }
        }
        return undefined;
    }
    /**
     *
     * @returns
     */
    getFirst() {
        for (const [key, data] of this._data) {
            if (data) {
                return key;
            }
        }
        return undefined;
    }
    /**
     *
     * @param Folder
     * @param Data
     */
    set(Folder, Data) {
        this._data.set(typeof Folder === 'string' ? Folder : Folder.uri, Data);
    }
    /**
     *
     * @param Folder
     * @returns
     */
    remove(Folder) {
        if (typeof Folder === 'string')
            return this._data.delete(Folder);
        return this._data.delete(Folder.uri);
    }
    /**
     *
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn, thisArg) {
        this._data.forEach(callbackfn, thisArg || this);
    }
    clear() {
        return this._data.clear();
    }
}
exports.WorkspaceData = WorkspaceData;
//# sourceMappingURL=workspace-data.js.map