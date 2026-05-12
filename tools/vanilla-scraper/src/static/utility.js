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
exports.baseVanilla = exports.baseEdu = exports.baseFolder = exports.outputVanilla = exports.outputEdu = exports.outputFolder = exports.libraryFolder = exports.workspaceFolder = exports.workFolder = void 0;
exports.download = download;
exports.downloadUnpack = downloadUnpack;
exports.getFolders = getFolders;
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const fs_1 = require("fs");
const https = __importStar(require("https"));
const path = __importStar(require("path"));
const util_1 = require("util");
const context_1 = require("../classes/context");
const minecraft_1 = require("./minecraft");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
// Directory paths
exports.workFolder = path.join(process.cwd(), 'work');
function findFolder(source, find) {
    let current = source;
    while (current.length > 0) {
        const item = path.join(current, find);
        if (fs.existsSync(item)) {
            return item;
        }
        const parent = path.dirname(current);
        if (parent === current)
            break;
        current = parent;
    }
    throw new Error(`Could not find folder '${find}' starting from '${source}'`);
}
exports.workspaceFolder = path.join(exports.workFolder, '..', '..', '..');
exports.libraryFolder = path.join(exports.workspaceFolder, 'packages', 'bedrock-vanilla-data');
exports.outputFolder = path.join(exports.libraryFolder, 'src', 'lib');
exports.outputEdu = path.join(exports.outputFolder, 'edu');
exports.outputVanilla = path.join(exports.outputFolder, 'vanilla');
exports.baseFolder = path.join(exports.libraryFolder, 'src', 'base');
exports.baseEdu = path.join(exports.baseFolder, 'edu');
exports.baseVanilla = path.join(exports.baseFolder, 'vanilla');
/**
 * Download file from URL
 */
async function download(filepath, uri) {
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
    console.log('start\tdownloading: ' + uri);
    return new Promise((resolve, reject) => {
        const file = (0, fs_1.createWriteStream)(filepath);
        const request = https.get(uri, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.close();
                fs.unlinkSync(filepath);
                download(filepath, response.headers.location).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('done\tdownloading: ' + uri);
                resolve();
            });
        });
        request.on('error', (err) => {
            fs.unlinkSync(filepath);
            reject(err);
        });
    });
}
/**
 * Download and unpack a zip file
 */
async function downloadUnpack(name, uri) {
    // Validate name to prevent path traversal
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
        console.error('Invalid name for download:', name);
        return null;
    }
    const filepath = path.join(exports.workFolder, `${name}.zip`);
    if (!fs.existsSync(filepath)) {
        await download(filepath, uri);
    }
    else {
        console.log('Skipping downloading: ' + uri);
    }
    if (fs.existsSync(filepath)) {
        const folder = path.join(exports.workFolder, name);
        if (!fs.existsSync(folder)) {
            console.log('Unzipping: ' + uri, { folder });
            try {
                fs.mkdirSync(folder, { recursive: true });
                // Use async exec with proper escaping
                await execAsync(`unzip -q "${filepath}" -d "${folder}"`);
            }
            catch (err) {
                console.error('Failed to unzip:', err);
                return null;
            }
        }
        else {
            console.log('Skipping unzipping: ' + uri);
        }
        return folder;
    }
    return null;
}
/**
 * Helper to add folder to list if it exists
 */
function existsIf(receiver, folder, subFolder) {
    if (subFolder) {
        folder = path.join(folder, subFolder);
    }
    if (fs.existsSync(folder)) {
        receiver.push(folder);
    }
}
/**
 * Get folders for scraping
 */
async function getFolders() {
    fs.mkdirSync(exports.workFolder, { recursive: true });
    fs.mkdirSync(exports.outputFolder, { recursive: true });
    const out = new context_1.Context();
    // Edu
    const eduInstall = (0, minecraft_1.eduInstallationFolder)();
    if (eduInstall !== null) {
        const bps = path.join(eduInstall, 'data', 'behavior_packs', 'education');
        const rps = path.join(eduInstall, 'data', 'resource_packs', 'education');
        existsIf(out.eduBP, bps);
        existsIf(out.eduRP, rps);
    }
    // Vanilla
    const install = (0, minecraft_1.installationFolder)();
    if (install !== null) {
        const bps = path.join(install, 'data', 'behavior_packs');
        const rps = path.join(install, 'data', 'resource_packs');
        existsIf(out.vanillaBP, bps, 'vanilla');
        existsIf(out.eduBP, bps, 'education');
        existsIf(out.vanillaRP, rps, 'vanilla');
        existsIf(out.eduRP, rps, 'education');
    }
    // Download from GitHub
    const df = await downloadUnpack('Samples', 'https://github.com/Mojang/bedrock-samples/archive/refs/heads/main.zip');
    if (df !== null) {
        const folder = path.join(df, 'bedrock-samples-main');
        existsIf(out.vanillaBP, folder, 'behavior_pack');
        existsIf(out.vanillaRP, folder, 'resource_pack');
        existsIf(out.metadataFolder, folder, 'metadata');
        out.githubFolder = folder;
    }
    return out;
}
//# sourceMappingURL=utility.js.map