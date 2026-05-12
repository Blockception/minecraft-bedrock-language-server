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
exports.InSelector = InSelector;
exports.InScore = InScore;
exports.InHasProperty = InHasProperty;
exports.InHasItem = InHasItem;
exports.IsFakePlayer = IsFakePlayer;
const selector_type_1 = require("bc-minecraft-bedrock-types/src/modes/selector-type");
const vscode_languageserver_1 = require("vscode-languageserver");
const attributes_1 = require("../../../../project/attributes");
const FakeEntity = __importStar(require("../../general/fake-entity"));
const AttributeValue = __importStar(require("./attribute-values"));
const Attributes = __importStar(require("./attributes"));
const HasItem = __importStar(require("./has-item"));
const HasProperty = __importStar(require("./has-property"));
const Scores = __importStar(require("./scores"));
/**
 *
 * @param context
 * @returns
 */
function provideCompletion(context) {
    const builder = context.builder;
    const selector = context.current;
    const pos = context.cursor;
    const Options = context.parameter.options;
    const edu = (0, attributes_1.IsEducationEnabled)(context.document);
    const playerOnly = Options?.playerOnly ?? false;
    if (Options?.wildcard)
        builder.add({
            label: '*',
            documentation: 'Wildcard, aimed at all players / entities, or possible stored in memory',
            kind: vscode_languageserver_1.CompletionItemKind.Constant,
        });
    if (selector === undefined || selector.text === '' || !InSelector(selector, pos)) {
        //In selector
        if (selector !== undefined) {
            const diff = pos - selector.offset;
            if (diff < 3) {
                builder.add({ label: '[', kind: vscode_languageserver_1.CompletionItemKind.Snippet });
                return;
            }
        }
        //Defaults
        FromType(builder, selector_type_1.InternalSelectorTypeMode.AllPlayers);
        FromType(builder, selector_type_1.InternalSelectorTypeMode.Nearest);
        FromType(builder, selector_type_1.InternalSelectorTypeMode.Random);
        FromType(builder, selector_type_1.InternalSelectorTypeMode.Self);
        if (!playerOnly) {
            FromType(builder, selector_type_1.InternalSelectorTypeMode.AllEntities);
        }
        if (context.document.uri.includes('/dialogue/'))
            FromType(builder, selector_type_1.InternalSelectorTypeMode.Initiator);
        if (edu) {
            FromType(builder, selector_type_1.InternalSelectorTypeMode.Agents);
            FromType(builder, selector_type_1.InternalSelectorTypeMode.AllAgents);
        }
        if (Options?.allowFakePlayers)
            FakeEntity.provideCompletion(context);
        return;
    }
    //Not in selector
    if (InScore(selector, pos)) {
        return Scores.provideCompletion(context, selector, pos);
    }
    //Not in selector
    if (InHasItem(selector, pos)) {
        return HasItem.provideCompletion(context, selector, pos);
    }
    if (InHasProperty(selector, pos)) {
        return HasProperty.provideCompletion(context, selector, pos);
    }
    if (AttributeValue.IsEditingValue(selector, pos)) {
        const Attribute = Attributes.GetCurrentAttribute(selector, pos);
        AttributeValue.provideCompletion(context, Attribute, !playerOnly);
    }
    else {
        Attributes.provideCompletion(context);
    }
}
/**
 *
 * @param receiver
 * @param item
 */
function FromType(receiver, item) {
    receiver.add({ label: item.name, documentation: item.documentation, kind: vscode_languageserver_1.CompletionItemKind.TypeParameter });
}
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
function InSelector(selector, pos) {
    if (pos < selector.offset + 2)
        return false;
    if (pos > selector.offset + selector.text.length)
        return false;
    return true;
}
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
function InScore(selector, pos) {
    pos -= selector.offset;
    let index = selector.text.indexOf('scores');
    if (index < 0)
        return false;
    //scores={}
    if (pos < index + 8) {
        return false;
    }
    index = selector.text.indexOf('}', index);
    if (pos <= index)
        return true;
    return pos <= index;
}
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
function InHasProperty(selector, pos) {
    pos -= selector.offset;
    let index = selector.text.indexOf('has_property');
    if (index < 0)
        return false;
    //scores={}
    if (pos < index + 8) {
        return false;
    }
    index = selector.text.indexOf('}', index);
    if (pos <= index)
        return true;
    return pos <= index;
}
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
function InHasItem(selector, pos) {
    pos -= selector.offset;
    let index = selector.text.indexOf('hasitem');
    if (index < 0)
        return false;
    //hasitem=[{}]
    if (pos < index + 10) {
        return false;
    }
    if (selector.text[index + 8] === '[') {
        index = selector.text.indexOf(']', index);
        if (pos <= index)
            return true;
        return pos <= index;
    }
    index = selector.text.indexOf('}', index);
    if (pos <= index)
        return true;
    return pos <= index;
}
/**
 *
 * @param text
 * @returns
 */
function IsFakePlayer(text) {
    return !text.startsWith('@') && text !== '*';
}
//# sourceMappingURL=selector.js.map