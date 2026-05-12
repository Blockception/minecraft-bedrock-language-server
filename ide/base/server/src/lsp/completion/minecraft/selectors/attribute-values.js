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
exports.IsEditingValue = IsEditingValue;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const vscode_languageserver_1 = require("vscode-languageserver");
const util_1 = require("../../../../util");
const general_1 = require("../../general");
const Entities = __importStar(require("../behavior-pack/entity/main"));
const Family = __importStar(require("../behavior-pack/families"));
const M = __importStar(require("../modes/modes"));
function provideCompletion(context, attribute, forEntities) {
    const builder = context.builder;
    switch (attribute) {
        case 'c':
            builder.add({
                label: '1',
                documentation: 'Limits the amount of target to 1',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
            });
            builder.add({
                label: '-1',
                documentation: 'Limits the amount of target to 1, but picked from the end of the list',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
            });
            builder.add({
                label: '5',
                documentation: 'Limits the amount of target to 5',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
            });
            builder.add({
                label: '-5',
                documentation: 'Limits the amount of target to 5, but picked from the end of the list',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
            });
            return;
        case 'dx':
        case 'dy':
        case 'dz':
            builder.add({ label: '5', documentation: 'A length of 5', kind: vscode_languageserver_1.CompletionItemKind.Constant });
            builder.add({
                label: '-5',
                documentation: 'A length of 5, in the other direction',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
            });
            return;
        case 'family':
            Family.provideCompletionTest(context);
            return;
        case 'r':
        case 'rm':
        case 'lm':
        case 'l':
            general_1.Integer.provideCreateCompletion(builder, 0, 100);
            return;
        case 'm':
            M.provideModeCompletionTest(bc_minecraft_bedrock_types_1.Modes.Gamemode, context);
            return;
        case 'name':
            general_1.Names.provideCompletion(context);
            return;
        case 'rx':
        case 'rxm':
        case 'ry':
        case 'rym':
            general_1.Float.provideCreateCompletion(builder, -180, 180);
            return;
        case 'tag':
            general_1.Tags.provideCompletionTest(context);
            return;
        case 'type':
            if (forEntities) {
                Entities.provideCompletion(context);
            }
            return;
        case 'x':
        case 'y':
        case 'z':
            builder.add({ label: '1', documentation: 'An absolute coordinate', kind: vscode_languageserver_1.CompletionItemKind.Constant });
            builder.add({ label: '~1', documentation: 'A relative coordinate', kind: vscode_languageserver_1.CompletionItemKind.Constant });
            builder.add({ label: '~-1', documentation: 'A relative coordinate', kind: vscode_languageserver_1.CompletionItemKind.Constant });
            return;
        case 'hasitem':
            builder.add({ label: '[{},{}]', documentation: 'Double Definition', kind: vscode_languageserver_1.CompletionItemKind.Class });
        // falls through
        case 'has_property':
        case 'scores':
            builder.add({ label: '{}', documentation: 'Definition', kind: vscode_languageserver_1.CompletionItemKind.Class });
            return;
    }
}
/**
 *
 * @param value
 * @param pos
 * @returns
 */
function IsEditingValue(value, pos) {
    const charBefore = util_1.Offset.charAt(value, pos - 1);
    if (charBefore === '{')
        return false;
    if (charBefore === ',')
        return false;
    if (charBefore === '=')
        return true;
    pos = pos - value.offset;
    if (pos < 0)
        return false;
    const text = value.text.slice(0, pos);
    const equals = text.lastIndexOf('=');
    if (equals > -1 && pos > equals) {
        //Block by the equals
        if (text.charAt(equals + 1) === '{')
            return false;
        if (text.lastIndexOf(',') > equals)
            return false;
        return true;
    }
    return false;
}
//# sourceMappingURL=attribute-values.js.map