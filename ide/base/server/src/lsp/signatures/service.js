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
exports.SignatureService = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const base_1 = require("../services/base");
const json_1 = require("./json");
const Language = __importStar(require("./minecraft/languages"));
const Mcfunction = __importStar(require("./minecraft/mcfunctions"));
const Molang = __importStar(require("./minecraft/molang/main"));
const triggerCharacters = ' abcdefghijklmnopqrstuvwxyz[]{}:.@=+-*/\\|!#$%^&*()<>?,\'"'.split('');
class SignatureService extends base_1.BaseService {
    name = 'signatures';
    constructor(logger, extension) {
        super(logger.withPrefix('[signatures]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('signatureHelpProvider', {
            triggerCharacters: triggerCharacters,
            retriggerCharacters: triggerCharacters,
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onSignatureHelp(this.onSignatureHelp.bind(this)));
    }
    async onSignatureHelp(params) {
        const position = params.position;
        const documents = this.extension.documents.get(params.textDocument.uri);
        if (!documents)
            return undefined;
        //TODO: use context
        //Switch per language type
        switch (documents.languageId) {
            case ide_shared_1.Languages.McFunctionIdentifier:
                return Mcfunction.provideSignature(documents, position);
            case ide_shared_1.Languages.McLanguageIdentifier:
                return Language.provideSignature(documents, position);
            case ide_shared_1.Languages.McMolangIdentifier:
                return Molang.provideDocSignature(documents, position);
            case ide_shared_1.Languages.McOtherIdentifier:
                return undefined;
            case ide_shared_1.Languages.JsonCIdentifier:
            case ide_shared_1.Languages.JsonIdentifier:
                return (0, json_1.provideJsonSignature)(documents, position);
        }
        return undefined;
    }
}
exports.SignatureService = SignatureService;
//# sourceMappingURL=service.js.map