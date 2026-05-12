"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kinds = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
var Kinds;
(function (Kinds) {
    let Symbol;
    (function (Symbol) {
        //General
        Symbol.AnimationControllers = vscode_languageserver_1.SymbolKind.Function;
        Symbol.Animation = vscode_languageserver_1.SymbolKind.Method;
        Symbol.BlockCulling = vscode_languageserver_1.SymbolKind.Function;
        Symbol.Block = vscode_languageserver_1.SymbolKind.Class;
        Symbol.Effect = vscode_languageserver_1.SymbolKind.Class;
        Symbol.Entity = vscode_languageserver_1.SymbolKind.Class;
        Symbol.FakeEntity = vscode_languageserver_1.SymbolKind.Interface;
        Symbol.Gamemode = vscode_languageserver_1.SymbolKind.Constant;
        Symbol.Item = vscode_languageserver_1.SymbolKind.Property;
        Symbol.Objectives = vscode_languageserver_1.SymbolKind.Variable;
        Symbol.Tickingarea = vscode_languageserver_1.SymbolKind.Module;
        //BP
        Symbol.Event = vscode_languageserver_1.SymbolKind.Event;
        Symbol.Family = vscode_languageserver_1.SymbolKind.EnumMember;
        Symbol.Functions = vscode_languageserver_1.SymbolKind.Class;
        Symbol.LootTable = vscode_languageserver_1.SymbolKind.Struct;
        Symbol.Trading = vscode_languageserver_1.SymbolKind.Struct;
        Symbol.Structure = vscode_languageserver_1.SymbolKind.Module;
        //RP
        Symbol.Fogs = vscode_languageserver_1.SymbolKind.Struct;
        Symbol.Texture = vscode_languageserver_1.SymbolKind.Struct;
        Symbol.Materials = vscode_languageserver_1.SymbolKind.Module;
        Symbol.Models = vscode_languageserver_1.SymbolKind.Class;
        Symbol.Particle = vscode_languageserver_1.SymbolKind.Class;
        Symbol.RenderController = vscode_languageserver_1.SymbolKind.Class;
        Symbol.Sound = vscode_languageserver_1.SymbolKind.Array;
        //Types
        Symbol.Boolean = vscode_languageserver_1.SymbolKind.Constant;
        Symbol.Coordinate = vscode_languageserver_1.SymbolKind.Constant;
        Symbol.Command = vscode_languageserver_1.SymbolKind.Class;
        Symbol.Float = vscode_languageserver_1.SymbolKind.Constant;
        Symbol.Integer = vscode_languageserver_1.SymbolKind.Constant;
        Symbol.Selector = vscode_languageserver_1.SymbolKind.TypeParameter;
        Symbol.Tag = vscode_languageserver_1.SymbolKind.Property;
        Symbol.Xp = vscode_languageserver_1.SymbolKind.Constant;
        Symbol.Property = vscode_languageserver_1.SymbolKind.Property;
    })(Symbol = Kinds.Symbol || (Kinds.Symbol = {}));
    let Completion;
    (function (Completion) {
        //General
        Completion.AnimationControllers = vscode_languageserver_1.CompletionItemKind.Function;
        Completion.Animation = vscode_languageserver_1.CompletionItemKind.Method;
        Completion.Block = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.Effect = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.Entity = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.FakeEntity = vscode_languageserver_1.CompletionItemKind.Interface;
        Completion.Gamemode = vscode_languageserver_1.CompletionItemKind.Constant;
        Completion.Item = vscode_languageserver_1.CompletionItemKind.Property;
        Completion.Objectives = vscode_languageserver_1.CompletionItemKind.Variable;
        Completion.Tickingarea = vscode_languageserver_1.CompletionItemKind.Module;
        //BP
        Completion.Event = vscode_languageserver_1.CompletionItemKind.Event;
        Completion.Family = vscode_languageserver_1.CompletionItemKind.EnumMember;
        Completion.Functions = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.LootTable = vscode_languageserver_1.CompletionItemKind.Struct;
        Completion.Trading = vscode_languageserver_1.CompletionItemKind.Struct;
        Completion.Structure = vscode_languageserver_1.CompletionItemKind.Module;
        //RP
        Completion.Fogs = vscode_languageserver_1.CompletionItemKind.Struct;
        Completion.Texture = vscode_languageserver_1.CompletionItemKind.Struct;
        Completion.Materials = vscode_languageserver_1.CompletionItemKind.Module;
        Completion.Models = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.Particle = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.RenderController = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.Sound = vscode_languageserver_1.CompletionItemKind.Value;
        //Types
        Completion.Boolean = vscode_languageserver_1.CompletionItemKind.Constant;
        Completion.Coordinate = vscode_languageserver_1.CompletionItemKind.Constant;
        Completion.Command = vscode_languageserver_1.CompletionItemKind.Class;
        Completion.Float = vscode_languageserver_1.CompletionItemKind.Constant;
        Completion.Integer = vscode_languageserver_1.CompletionItemKind.Constant;
        Completion.Selector = vscode_languageserver_1.CompletionItemKind.TypeParameter;
        Completion.Tag = vscode_languageserver_1.CompletionItemKind.Property;
        Completion.Xp = vscode_languageserver_1.CompletionItemKind.Constant;
        Completion.Vanilla = vscode_languageserver_1.CompletionItemKind.Unit;
        Completion.Property = vscode_languageserver_1.CompletionItemKind.Property;
    })(Completion = Kinds.Completion || (Kinds.Completion = {}));
})(Kinds || (exports.Kinds = Kinds = {}));
//# sourceMappingURL=kinds.js.map