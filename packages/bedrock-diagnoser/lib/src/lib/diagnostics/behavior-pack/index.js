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
exports.Trading = exports.Structure = exports.Spawn_Rule = exports.Script = exports.Mcfunction = exports.Manifest = exports.Loot_Table = exports.Item = exports.Functions = exports.Events = exports.Entity = exports.BlockState = exports.Block = exports.Animation_Controllers = exports.Animation = void 0;
/*	Auto generated	*/
exports.Animation = __importStar(require("./animation/index"));
exports.Animation_Controllers = __importStar(require("./animation-controllers/index"));
exports.Block = __importStar(require("./block/index"));
exports.BlockState = __importStar(require("./block-state/index"));
exports.Entity = __importStar(require("./entity/index"));
exports.Events = __importStar(require("./events/index"));
exports.Functions = __importStar(require("./functions/index"));
exports.Item = __importStar(require("./item/index"));
exports.Loot_Table = __importStar(require("./loot-table/index"));
exports.Manifest = __importStar(require("./manifest/index"));
exports.Mcfunction = __importStar(require("./mcfunction/index"));
exports.Script = __importStar(require("./script/index"));
exports.Spawn_Rule = __importStar(require("./spawn-rule/index"));
exports.Structure = __importStar(require("./structure/index"));
exports.Trading = __importStar(require("./trading/index"));
__exportStar(require("./behavior-pack"), exports);
__exportStar(require("./anim-or-controller"), exports);
//# sourceMappingURL=index.js.map