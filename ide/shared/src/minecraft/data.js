"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBedrockDataFolder = GetBedrockDataFolder;
const path_1 = __importDefault(require("path"));
const general_1 = require("./general");
function GetBedrockDataFolder() {
    let base;
    switch (process.platform) {
        case 'win32':
            base = GetBedrockWinsDataFolder();
            break;
        case 'aix':
        case 'darwin':
        case 'freebsd':
        case 'linux':
        case 'openbsd':
        case 'sunos':
            throw new Error(`Unknown platform, ${process.platform} please make an issue on github :D`);
    }
    if (!base) {
        throw new Error('Installation folder not found');
    }
    return base;
}
function GetBedrockWinsDataFolder() {
    const AppDataLocal = process.env.LOCALAPPDATA;
    if (AppDataLocal) {
        return (0, general_1.findInFolder)(path_1.default.join(AppDataLocal, 'Packages'), 'Microsoft.MinecraftUWP');
    }
    return '';
}
//# sourceMappingURL=data.js.map