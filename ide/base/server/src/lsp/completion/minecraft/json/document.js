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
exports.provideCompletionDocument = provideCompletionDocument;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const functions_1 = require("../../../../minecraft/json/functions");
const path_1 = require("../../../../minecraft/json/path");
const types_1 = require("../../../../minecraft/json/types");
const context_1 = require("../../../context/context");
const behavior_pack_1 = require("../behavior-pack");
const BehaviorPack = __importStar(require("../behavior-pack/main"));
const Mcfunction = __importStar(require("../mcfunctions/mcfunctions"));
const Molang = __importStar(require("../molang/main"));
const ResourcePack = __importStar(require("../resource-pack/main"));
function provideCompletionDocument(context) {
    const { document, cursor } = context;
    const text = document.getText();
    const p = (0, path_1.getJsonPath)(context.cursor, text);
    if (!p.isProperty) {
        return;
    }
    //If start has not been found or not a property
    const range = (0, functions_1.getCurrentStringValue)(text, p.property, cursor) ?? { start: cursor, end: cursor };
    const currentText = text.substring(range.start, range.end);
    const jsonContext = context_1.Context.modify(context, {
        builder: jsonBuilder(cursor, range, currentText, document, context.builder),
        range,
        currentText,
    });
    //Have each new item pass through a new function
    performJsonCompletion(jsonContext);
}
function jsonBuilder(cursor, range, currentText, document, builder) {
    const insertIndex = cursor - range.start;
    const first = currentText.substring(0, insertIndex);
    const second = currentText.substring(insertIndex);
    const position = document.positionAt(cursor);
    return builder.withEvents(undefined, (item) => {
        //Update the filtering text
        let filterText = item.insertText ?? item.label;
        if (currentText === '') {
            item.filterText = filterText;
            return;
        }
        if (first !== '' && !filterText.startsWith(first))
            filterText = first + filterText;
        if (second !== '' && !filterText.endsWith(second))
            filterText = filterText + second;
        // Filter text is provided for completion order
        if (!filterText.endsWith('"'))
            filterText = filterText + '"';
        if (!filterText.startsWith('"'))
            filterText = '"' + filterText;
        item.filterText = filterText;
        item.textEdit = vscode_languageserver_1.InsertReplaceEdit.create(item.insertText ?? item.label, vscode_languageserver_1.Range.create(position, position), vscode_languageserver_1.Range.create(position, position));
        if (item.insertText)
            item.insertText = undefined;
    });
}
function performJsonCompletion(context) {
    if (!context.settings?.Completion?.JSON)
        return;
    const type = bc_minecraft_bedrock_project_1.PackType.detect(context.document.uri);
    if (type == bc_minecraft_bedrock_project_1.PackType.unknown) {
        return;
    }
    onCompletionJsonMolang(context);
    context = context_1.Context.modify(context, {
        builder: context.builder.withEvents((item) => {
            item.insertText = item.insertText ?? item.label;
            item.insertText = (0, types_1.santizeValue)(item.insertText);
        }),
    });
    switch (type) {
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return BehaviorPack.provideJsonCompletion(context);
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            return ResourcePack.provideJsonCompletion(context);
    }
}
function onCompletionJsonMolang(context) {
    //Find all events
    if (context.currentText.startsWith('@s')) {
        behavior_pack_1.EntityEvent.provideCompletion(context);
        //Is it a command instead
    }
    else if (context.currentText.startsWith('/')) {
        Mcfunction.provideCompletionLine(context, context.currentText.substring(1), context.cursor);
        //Its probably molang
    }
    else {
        Molang.provideCompletion(context, context.currentText, context.cursor - context.range.start);
    }
}
//# sourceMappingURL=document.js.map