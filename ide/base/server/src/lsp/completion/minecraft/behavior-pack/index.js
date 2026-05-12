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
exports.Trading = exports.Structures = exports.LootTables = exports.Items = exports.Functions = exports.Families = exports.Entities = exports.EntityEvent = exports.Blocks = exports.BlockStates = exports.Animations = exports.AnimationControllers = void 0;
exports.AnimationControllers = __importStar(require("./animation-controllers"));
exports.Animations = __importStar(require("./animations"));
exports.BlockStates = __importStar(require("./block-states"));
exports.Blocks = __importStar(require("./blocks"));
exports.EntityEvent = __importStar(require("./entity/event"));
exports.Entities = __importStar(require("./entity/main"));
exports.Families = __importStar(require("./families"));
exports.Functions = __importStar(require("./functions"));
exports.Items = __importStar(require("./items"));
exports.LootTables = __importStar(require("./loot-tables"));
exports.Structures = __importStar(require("./structures"));
exports.Trading = __importStar(require("./trading"));
//# sourceMappingURL=index.js.map