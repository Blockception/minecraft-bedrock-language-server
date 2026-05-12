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
exports.toSnakeCase = toSnakeCase;
exports.convertToSnakeCase = convertToSnakeCase;
exports.saveArray = saveArray;
exports.saveSingle = saveSingle;
const fs = __importStar(require("fs"));
/**
 * Convert property name to snake_case
 */
function toSnakeCase(name) {
    let result = '';
    for (let i = 0; i < name.length; i++) {
        const char = name[i];
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            result += '_' + char.toLowerCase();
        }
        else {
            result += char;
        }
    }
    return result;
}
/**
 * Convert object keys to snake_case recursively
 */
function convertToSnakeCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(convertToSnakeCase);
    }
    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            result[toSnakeCase(key)] = convertToSnakeCase(value);
        }
        return result;
    }
    return obj;
}
/**
 * Save array data to a TypeScript file
 */
function saveArray(type, typeLocation, name, data, filepath) {
    try {
        let content = '/** Notice: Auto generated file, do not edit */\n\n';
        if (typeLocation !== null) {
            content += `import { ${type} } from '${typeLocation}';\n\n\n`;
        }
        const snakeCaseData = convertToSnakeCase(data);
        const jsonContent = JSON.stringify(snakeCaseData, null, 2);
        content += `export const ${name}: ${type}[] = ${jsonContent};`;
        console.log("saving: " + filepath);
        fs.writeFileSync(filepath, content, 'utf-8');
    }
    catch (ex) {
        console.error(ex);
    }
}
/**
 * Save single object data to a TypeScript file
 */
function saveSingle(type, typeLocation, name, data, filepath) {
    try {
        let content = '/** Notice: Auto generated file, do not edit */\n\n';
        if (typeLocation !== null) {
            content += `import { ${type} } from '${typeLocation}';\n\n\n`;
        }
        const snakeCaseData = convertToSnakeCase(data);
        const jsonContent = JSON.stringify(snakeCaseData, null, 2);
        content += `export const ${name}: ${type} = ${jsonContent};`;
        console.log("saving: " + filepath);
        fs.writeFileSync(filepath, content, 'utf-8');
    }
    catch (ex) {
        console.error(ex);
    }
}
//# sourceMappingURL=typescript.js.map