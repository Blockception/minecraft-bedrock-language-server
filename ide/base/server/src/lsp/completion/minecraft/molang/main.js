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
exports.provideDocCompletion = provideDocCompletion;
exports.provideCompletion = provideCompletion;
const ide_shared_1 = require("@blockception/ide-shared");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const functions_1 = require("../../../../minecraft/molang/functions");
const context_1 = require("../../../context/context");
const Geometry = __importStar(require("./geometry"));
const Material = __importStar(require("./materials"));
const Math = __importStar(require("./math"));
const Query = __importStar(require("./query"));
const Temps = __importStar(require("./temps"));
const Texture = __importStar(require("./texture"));
const Variables = __importStar(require("./variables"));
const BP_Animation_Controllers = __importStar(require("../behavior-pack/animation-controllers"));
const BP_Animations = __importStar(require("../behavior-pack/animations"));
const RP_Animations_Controllers = __importStar(require("../resource-pack/animation-controllers"));
const RP_Animations = __importStar(require("../resource-pack/animations"));
const RP_Render_Controllers = __importStar(require("../resource-pack/render-controllers"));
function provideDocCompletion(context) {
    const { document, position } = context;
    const line = document.getLine(position.line);
    return provideCompletion(context, line, context.cursor);
}
/**
 *
 * @param line
 * @param cursor
 * @param doc
 * @param receiver
 * @returns
 */
function provideCompletion(context, line, cursor) {
    const word = (0, functions_1.getPreviousWord)(line, cursor).toLowerCase();
    switch (word) {
        case 'animation':
            return prefixedData(RP_Animations.provideCompletion, BP_Animations.provideCompletion, context);
        case 'controller':
            return prefixedData((context) => {
                RP_Animations_Controllers.provideCompletion(context);
                RP_Render_Controllers.provideCompletion(context);
            }, BP_Animation_Controllers.provideCompletion, context);
        case 'q':
        case 'query':
            return Query.provideCompletion(context);
        case 'm':
        case 'math':
            return Math.provideCompletion(context);
        case 'geometry':
            return Geometry.provideCompletion(context);
        case 'material':
            return Material.provideCompletion(context);
        case 'v':
        case 'variable':
            return Variables.provideCompletion(context);
        case 't':
        case 'texture':
            return Texture.provideCompletion(context);
        case 'temp':
            return Temps.provideCompletion(context);
    }
    const { document, builder } = context;
    if (line.length === 0 || (0, functions_1.IsMolang)(line) || document.languageId == ide_shared_1.Languages.McMolangIdentifier) {
        builder.add({ label: 'query', documentation: 'Molang queries', kind: vscode_languageserver_1.CompletionItemKind.Class });
        builder.add({ label: 'variable', documentation: 'Defined variables', kind: vscode_languageserver_1.CompletionItemKind.Variable });
        builder.add({ label: 'math', documentation: 'Math functions', kind: vscode_languageserver_1.CompletionItemKind.Class });
        builder.add({ label: 'texture', documentation: 'Texture definitions', kind: vscode_languageserver_1.CompletionItemKind.Property });
        builder.add({ label: 'material', documentation: 'Material definitions', kind: vscode_languageserver_1.CompletionItemKind.Property });
        builder.add({ label: 'geometry', documentation: 'Geometry definitions', kind: vscode_languageserver_1.CompletionItemKind.Property });
        builder.add({ label: 'temp', documentation: 'Temporary variable definitions', kind: vscode_languageserver_1.CompletionItemKind.Variable });
        builder.add({ label: 'this', documentation: 'refers to this object', kind: vscode_languageserver_1.CompletionItemKind.Struct });
    }
}
/**
 *
 * @param RP
 * @param BP
 * @param context
 */
function prefixedData(RP, BP, context) {
    const type = bc_minecraft_bedrock_project_1.PackType.detect(context.document.uri);
    //register new OnNewItem event to prune ids
    const ncontext = context_1.Context.modify(context, {
        builder: context.builder.withEvents((item) => {
            item.label = IDRemoveFirst(item.label);
        }),
    });
    switch (type) {
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return BP(ncontext);
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            return RP(ncontext);
    }
}
/**
 *
 * @param id
 * @returns
 */
function IDRemoveFirst(id) {
    const index = id.indexOf('.');
    if (index > -1)
        return id.substring(index + 1);
    return id;
}
//# sourceMappingURL=main.js.map