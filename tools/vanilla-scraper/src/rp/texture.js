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
exports.createTexture = createTexture;
exports.convertTexture = convertTexture;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * Create a new Texture
 */
function createTexture() {
    return {
        id: '',
    };
}
/**
 * Convert pack folder to Texture objects
 */
function convertTexture(pack) {
    const texturesFolder = path.join(pack, 'textures');
    const textureFiles = getFilesRecursively(texturesFolder, ['.png', '.tga']);
    return convertFiles(textureFiles);
}
/**
 * Convert file paths to Texture objects
 */
function convertFiles(files) {
    const receiver = [];
    console.log('converting files', files.length);
    for (const filepath of files) {
        const index = filepath.indexOf('textures');
        if (index >= 0) {
            const ext = path.extname(filepath);
            const id = filepath.substring(index, filepath.length - ext.length).replace(/\\/g, '/');
            if (id) {
                const item = createTexture();
                item.id = id;
                receiver.push(item);
            }
        }
    }
    return receiver;
}
/**
 * Get all files with extension recursively
 */
function getFilesRecursively(folder, extensions) {
    const results = [];
    console.log('getting files for: ' + folder);
    function walk(dir) {
        if (!fs.existsSync(dir))
            return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            }
            else if (entry.isFile()) {
                const ext = path.extname(entry.name);
                if (extensions.includes(ext)) {
                    results.push(fullPath);
                }
            }
        }
    }
    walk(folder);
    return results;
}
//# sourceMappingURL=texture.js.map