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
exports.provideCompletion = provideCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const constants_1 = require("../../../../constants");
const builder_1 = require("../../builder");
const molang_1 = require("../molang");
const AnimationControllers = __importStar(require("./animation-controllers"));
const Animations = __importStar(require("./animations"));
const Models = __importStar(require("./models"));
const RenderControllers = __importStar(require("./render-controllers"));
const Textures = __importStar(require("./textures"));
function provideCompletion(context) {
    const generateDoc = (item) => `The attachbles: ${item.id}`;
    context.builder.generate(context.database.ProjectData.resourcePacks.attachables, generateDoc, constants_1.Kinds.Completion.Item);
}
function provideJsonCompletion(context) {
    return attachableRpJsonCompletion.onCompletion(context);
}
const attachableRpJsonCompletion = new builder_1.JsonPathCompletion({
    match: (path) => path.includes('minecraft:attachable/description/animations/'),
    onCompletion: (c) => {
        Animations.provideCompletion(c);
        AnimationControllers.provideCompletion(c);
    },
}, {
    match: (path) => path.includes('minecraft:client_entity/description/materials/'),
    onCompletion: molang_1.Material.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:attachable/description/animation_controllers/'),
    onCompletion: AnimationControllers.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:attachable/description/geometry/'),
    onCompletion: Models.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:attachable/description/render_controllers/'),
    onCompletion: RenderControllers.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:attachable/description/textures/'),
    onCompletion: Textures.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:attachable/description/scripts/animate/'),
    onCompletion: (context) => {
        const data = context.database.ProjectData.resourcePacks.attachables.find((attachable) => attachable.location.uri === context.document.uri);
        if (data === undefined)
            return;
        context.builder.generate(data.animations.defined, (item) => `The rp entity animation: ${item}`, constants_1.Kinds.Completion.Animation);
    },
});
//# sourceMappingURL=attachables.js.map