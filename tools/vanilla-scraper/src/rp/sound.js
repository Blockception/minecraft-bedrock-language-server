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
exports.createSound = createSound;
exports.convertSound = convertSound;
const path = __importStar(require("path"));
const json_1 = require("../static/json");
/**
 * Create a new Sound
 */
function createSound() {
    return {
        id: '',
    };
}
/**
 * Convert pack folder to Sound objects
 */
function convertSound(pack, receiver, soundFiles) {
    const filepath = path.join(pack, 'sounds', 'sound_definitions.json');
    const doc = (0, json_1.getDoc)(filepath);
    if (doc === null)
        return;
    const root = doc;
    const definitions = root['sound_definitions'];
    if (definitions) {
        for (const [defName, defValue] of Object.entries(definitions)) {
            const item = createSound();
            item.id = defName;
            receiver.push(item);
            const def = defValue;
            const sounds = def['sounds'];
            if (sounds) {
                convertSounds(sounds, soundFiles);
            }
        }
    }
}
/**
 * Convert sounds array to file paths
 */
function convertSounds(sounds, soundFiles) {
    for (const item of sounds) {
        if (typeof item === 'object' && item !== null) {
            const obj = item;
            const name = obj['name'];
            if (name) {
                soundFiles.push(name);
            }
        }
        else if (typeof item === 'string') {
            soundFiles.push(item);
        }
    }
}
//# sourceMappingURL=sound.js.map