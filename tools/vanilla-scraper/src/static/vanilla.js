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
exports.githubLinks = githubLinks;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const _exclude = ['manifest.json', 'behavior_trees', 'contents.json'];
/**
 * Generate GitHub links file from scraped files
 */
function githubLinks(githubFolder, outputFolder) {
    const files = getAllJsonFiles(githubFolder);
    const items = [];
    for (const file of files) {
        if (isExcluded(file))
            continue;
        const type = packType(file);
        if (type === null)
            continue;
        // Transform filepath to github raw link
        const link = file.replace(githubFolder, '').replace(/\\/g, '/');
        items.push(link);
    }
    items.sort();
    const filepath = path.join(outputFolder, 'vanilla', 'sources.ts');
    let content = 'export const GithubFiles = {\n';
    content += '  source: "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/",\n';
    content += '  files: [\n';
    for (const link of items) {
        content += `    "${link.replace(/^\//, '')}",\n`;
    }
    content += ']};\n';
    fs.writeFileSync(filepath, content, 'utf-8');
}
/**
 * Check if path should be excluded
 */
function isExcluded(filePath) {
    for (const exclude of _exclude) {
        if (filePath.includes(exclude)) {
            return true;
        }
    }
    return false;
}
/**
 * Get pack type from path
 */
function packType(filePath) {
    if (filePath.includes('behavior_pack')) {
        return 'behavior_pack';
    }
    if (filePath.includes('resource_pack')) {
        return 'resource_pack';
    }
    return null;
}
/**
 * Recursively get all JSON files in a folder
 */
function getAllJsonFiles(folder) {
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
            else if (entry.isFile() && entry.name.endsWith('.json')) {
                results.push(fullPath);
            }
        }
    }
    walk(folder);
    return results;
}
//# sourceMappingURL=vanilla.js.map