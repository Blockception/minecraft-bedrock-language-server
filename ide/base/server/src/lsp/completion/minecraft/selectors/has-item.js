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
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../../../constants");
const attribute_values_1 = require("./attribute-values");
const attributes_1 = require("./attributes");
const Integer = __importStar(require("../../general/integer"));
const Item = __importStar(require("../behavior-pack/items"));
const M = __importStar(require("../modes/modes"));
function provideCompletion(context, selector, pos) {
    const builder = context.builder;
    if ((0, attribute_values_1.IsEditingValue)(selector, pos)) {
        const attr = (0, attributes_1.GetCurrentAttribute)(selector, pos);
        switch (attr) {
            case 'data':
                return Integer.provideCreateCompletion(builder, -1, 9);
            case 'item':
                return Item.provideCompletion(context);
            case 'location':
                return M.provideModeCompletion(bc_minecraft_bedrock_types_1.Modes.SlotType, context);
            case 'slot':
                return Integer.provideCreateCompletion(builder, 0, 53);
            case 'quantity':
                return Integer.provideCreateCompletion(builder, 0, 10);
        }
        return;
    }
    builder.add({
        label: 'data',
        documentation: 'The data of the item that the selector is looking for',
        kind: constants_1.Kinds.Completion.Integer,
        insertText: 'data=',
    });
    builder.add({
        label: 'item',
        documentation: 'The item that the selector is looking for',
        kind: constants_1.Kinds.Completion.Item,
        insertText: 'item=',
    });
    builder.add({
        label: 'location',
        documentation: 'The slot id identification',
        kind: vscode_languageserver_1.CompletionItemKind.Enum,
        insertText: 'location=',
    });
    builder.add({
        label: 'quantity',
        documentation: 'The quantity of the item that the selector is looking for',
        kind: constants_1.Kinds.Completion.Integer,
        insertText: 'quantity=',
    });
    builder.add({
        label: 'slot',
        documentation: 'The slot number to check',
        kind: constants_1.Kinds.Completion.Integer,
        insertText: 'slot=',
    });
}
//# sourceMappingURL=has-item.js.map