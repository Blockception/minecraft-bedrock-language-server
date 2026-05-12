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
exports.onCodeAction = onCodeAction;
const AnimationControllers = __importStar(require("./animation-controllers"));
const Animations = __importStar(require("./animations"));
const Attachables = __importStar(require("./attachables"));
const Blocks = __importStar(require("./blocks"));
const Entities = __importStar(require("./entities"));
const Fogs = __importStar(require("./fogs"));
const Materials = __importStar(require("./materials"));
const Particles = __importStar(require("./particles"));
const RenderControllers = __importStar(require("./render-controllers"));
/**
 *
 * @param builder
 * @param diag
 */
function onCodeAction(builder, diag) {
    const code = diag.code ?? '';
    if (typeof code === 'number')
        return;
    const index = code.indexOf('.', 13);
    const subcode = index > -1 ? code.slice(13, index) : code.slice(13);
    switch (subcode) {
        case 'animation_controller':
            return AnimationControllers.onCodeAction(builder, diag);
        case 'animation':
            return Animations.onCodeAction(builder, diag);
        case 'anim_or_controller':
            AnimationControllers.onCodeAction(builder, diag);
            return Animations.onCodeAction(builder, diag);
        case 'attachable':
        case 'item':
            return Attachables.onCodeAction(builder, diag);
        case 'block':
            return Blocks.onCodeAction(builder, diag);
        case 'entity':
            return Entities.onCodeAction(builder, diag);
        case 'fog':
            return Fogs.onCodeAction(builder, diag);
        case 'material':
            return Materials.onCodeAction();
        case 'particle':
            return Particles.onCodeAction(builder, diag);
        case 'render_controller':
            return RenderControllers.onCodeAction(builder, diag);
    }
}
//# sourceMappingURL=main.js.map