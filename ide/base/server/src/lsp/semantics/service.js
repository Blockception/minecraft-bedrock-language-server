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
exports.SemanticsServer = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
const base_1 = require("../services/base");
const constants_1 = require("./constants");
const json_1 = require("./minecraft/json");
const molang_1 = require("./minecraft/molang");
const Mcfunction = __importStar(require("./minecraft/mcfunctions"));
class SemanticsServer extends base_1.BaseService {
    name = 'definitions';
    constructor(logger, extension) {
        super(logger.withPrefix('[definitions]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('definitionProvider', {
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.languages.semanticTokens.on(this.onProvideSemanticRequest.bind(this)), connection.languages.semanticTokens.onRange(this.onProvideSemanticRequest.bind(this)));
    }
    dynamicRegister(register) {
        register.add(vscode_languageserver_1.SemanticTokensRegistrationType.type, {
            documentSelector: [
                { language: ide_shared_1.Languages.JsonCIdentifier },
                { language: ide_shared_1.Languages.JsonIdentifier },
                { language: ide_shared_1.Languages.McFunctionIdentifier },
                { language: ide_shared_1.Languages.McLanguageIdentifier },
                { language: ide_shared_1.Languages.McOtherIdentifier },
                { language: ide_shared_1.Languages.McMolangIdentifier },
            ],
            legend: {
                tokenModifiers: constants_1.SemanticModifiers,
                tokenTypes: constants_1.SemanticTokens,
            },
            range: true,
            full: true,
        });
    }
    async onProvideSemanticRequest(params) {
        const uri = params.textDocument.uri;
        if (!uri.startsWith('file://'))
            return { data: [] };
        const document = this.extension.documents.get(uri);
        if (!document)
            return { data: [] };
        // TODO: context object
        let range = undefined;
        if (IsSemanticTokensRangeParams(params)) {
            range = params.range;
        }
        switch (document.languageId) {
            case ide_shared_1.Languages.JsonCIdentifier:
            case ide_shared_1.Languages.JsonIdentifier:
                return (0, json_1.provideJsonSemanticTokens)(document, range);
            case ide_shared_1.Languages.McFunctionIdentifier:
                return Mcfunction.provideSemanticToken(document, range);
            case ide_shared_1.Languages.McMolangIdentifier:
                return (0, molang_1.provideMolangSemanticTokens)(document, range);
            case ide_shared_1.Languages.McOtherIdentifier:
            case ide_shared_1.Languages.McLanguageIdentifier:
                break;
        }
        return { data: [] };
    }
}
exports.SemanticsServer = SemanticsServer;
function IsSemanticTokensRangeParams(value) {
    const temp = value;
    if (temp.range && vscode_languageserver_1.Range.is(temp.range))
        return true;
    return false;
}
//# sourceMappingURL=service.js.map