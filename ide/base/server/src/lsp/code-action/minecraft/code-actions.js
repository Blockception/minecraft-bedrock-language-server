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
const BP_AnimationControllers = __importStar(require("./behavior-pack/animation-controllers"));
const BP_Animations = __importStar(require("./behavior-pack/animations"));
const Family = __importStar(require("./behavior-pack/families"));
const Commands = __importStar(require("./commands/commands"));
const General = __importStar(require("./general"));
const RP_AnimationControllers = __importStar(require("./resource-pack/animation-controllers"));
const RP_Animations = __importStar(require("./resource-pack/animations"));
/**
 *
 * @param builder
 * @param diag
 */
function onCodeAction(builder, diag) {
    const code = diag.code ?? '';
    if (typeof code === 'number')
        return;
    //minecraft.
    const index = code.indexOf('.', 10);
    const subCode = index > -1 ? code.slice(10, index) : code.slice(10);
    switch (subCode) {
        case 'animation':
            BP_Animations.onCodeAction(builder, diag);
            return RP_Animations.onCodeAction(builder, diag);
        case 'animation_controller':
            BP_AnimationControllers.onCodeAction(builder, diag);
            return RP_AnimationControllers.onCodeAction(builder, diag);
        case 'anim_or_controller':
            BP_Animations.onCodeAction(builder, diag);
            BP_AnimationControllers.onCodeAction(builder, diag);
            RP_Animations.onCodeAction(builder, diag);
            return RP_AnimationControllers.onCodeAction(builder, diag);
        case 'commands':
            return Commands.onCodeAction(builder, diag);
        case 'fakeentity':
            return General.FakeEntity.onCodeAction(builder, diag);
        case 'family':
            return Family.onCodeAction(builder, diag);
        case 'name':
            return General.Names.onCodeAction(builder, diag);
        case 'objective':
            return General.Objectives.onCodeAction(builder, diag);
        case 'tag':
            return General.Tags.onCodeAction(builder, diag);
        case 'tickingarea':
            return General.TickingAreas.onCodeAction(builder, diag);
    }
}
//# sourceMappingURL=code-actions.js.map