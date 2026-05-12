"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaterial = createMaterial;
exports.convertMaterial = convertMaterial;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const json_1 = require("../static/json");
/**
 * Create a new Material
 */
function createMaterial() {
    return {
        id: '',
    };
}
/**
 * Convert pack folder to Material objects
 */
function convertMaterial(pack, receiver) {
    const folder = path.join(pack, 'materials');
    if (!fs.existsSync(folder)) {
        return;
    }
    const files = getFilesRecursively(folder, '.material');
    for (const filepath of files) {
        const doc = (0, json_1.getDoc)(filepath);
        if (doc === null)
            continue;
        const root = doc;
        const materials = root['materials'];
        if (materials) {
            for (const matName of Object.keys(materials)) {
                if (matName === 'version')
                    continue;
                let id = matName;
                const colonIndex = id.indexOf(':');
                if (colonIndex >= 0) {
                    id = id.substring(0, colonIndex);
                }
                const item = createMaterial();
                item.id = id;
                receiver.push(item);
            }
        }
    }
}
/**
 * Get all files with extension recursively
 */
function getFilesRecursively(folder, extension) {
    const results = [];
    function walk(dir) {
        if (!fs.existsSync(dir))
            return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            }
            else if (entry.isFile() && entry.name.endsWith(extension)) {
                results.push(fullPath);
            }
        }
    }
    walk(folder);
    return results;
}
//# sourceMappingURL=material.js.map