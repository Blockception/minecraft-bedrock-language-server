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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trading = exports.Structure = exports.Recipe = exports.McFunction = exports.LootTable = exports.ItemCatalog = exports.Item = exports.FeatureRule = exports.Feature = exports.Entity = exports.Block = exports.Biome = exports.AnimationController = exports.Animation = void 0;
/*	Auto generated	*/
exports.Animation = __importStar(require("./animation"));
exports.AnimationController = __importStar(require("./animation-controller"));
exports.Biome = __importStar(require("./biome"));
exports.Block = __importStar(require("./block"));
exports.Entity = __importStar(require("./entity"));
exports.Feature = __importStar(require("./feature"));
exports.FeatureRule = __importStar(require("./feature_rule"));
exports.Item = __importStar(require("./item"));
exports.ItemCatalog = __importStar(require("./item_catalog"));
exports.LootTable = __importStar(require("./loot-table"));
exports.McFunction = __importStar(require("./mcfunction"));
exports.Recipe = __importStar(require("./recipe"));
exports.Structure = __importStar(require("./structure"));
exports.Trading = __importStar(require("./trading"));
__exportStar(require("./behavior-pack"), exports);
__exportStar(require("./behavior-pack-collection"), exports);
__exportStar(require("./file-type"), exports);
//# sourceMappingURL=index.js.map