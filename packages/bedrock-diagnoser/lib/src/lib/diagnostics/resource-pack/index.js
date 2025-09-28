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
exports.Texture_Atlas = exports.Texture = exports.Sounds_Definitions = exports.Sounds = exports.Render_Controller = exports.Particle = exports.Music_Definitions = exports.Model = exports.Material = exports.Manifest = exports.Item = exports.Fog = exports.Entity = exports.Block = exports.Biomes_Client = exports.Attachable = exports.Animation_Controllers = exports.Animation = void 0;
/*	Auto generated	*/
exports.Animation = __importStar(require("./animation/index"));
exports.Animation_Controllers = __importStar(require("./animation-controllers/index"));
exports.Attachable = __importStar(require("./attachable/index"));
exports.Biomes_Client = __importStar(require("./biomes-client/index"));
exports.Block = __importStar(require("./block/index"));
exports.Entity = __importStar(require("./entity/index"));
exports.Fog = __importStar(require("./fog/index"));
exports.Item = __importStar(require("./item/index"));
exports.Manifest = __importStar(require("./manifest/index"));
exports.Material = __importStar(require("./material/index"));
exports.Model = __importStar(require("./model/index"));
exports.Music_Definitions = __importStar(require("./music-definitions/index"));
exports.Particle = __importStar(require("./particle/index"));
exports.Render_Controller = __importStar(require("./render-controller/index"));
exports.Sounds = __importStar(require("./sounds/index"));
exports.Sounds_Definitions = __importStar(require("./sounds-definitions/index"));
exports.Texture = __importStar(require("./texture/index"));
exports.Texture_Atlas = __importStar(require("./texture-atlas/index"));
__exportStar(require("./resource-pack"), exports);
__exportStar(require("./anim-or-controller"), exports);
//# sourceMappingURL=index.js.map