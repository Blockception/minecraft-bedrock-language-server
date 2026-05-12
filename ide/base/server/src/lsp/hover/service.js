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
exports.HoverService = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const context_1 = require("../context/context");
const base_1 = require("../services/base");
const Json = __importStar(require("./minecraft/json"));
const Mcfunction = __importStar(require("./minecraft/mcfunction"));
const Molang = __importStar(require("./minecraft/molang"));
class HoverService extends base_1.BaseService {
    name = 'hover';
    constructor(logger, extension) {
        super(logger.withPrefix('[hover]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('hoverProvider', {
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onHover(this.onHoverRequest.bind(this)));
    }
    async onHoverRequest(params, token, workDoneProgress) {
        const document = this.extension.documents.get(params.textDocument.uri);
        if (!document)
            return undefined;
        const context = context_1.Context.create(this.extension, { document, params, token, workDoneProgress }, { logger: this.logger });
        switch (document.languageId) {
            case ide_shared_1.Languages.McFunctionIdentifier:
                return Mcfunction.provideHover(context);
            case ide_shared_1.Languages.JsonCIdentifier:
            case ide_shared_1.Languages.JsonIdentifier:
                return Json.provideHover(context);
            case ide_shared_1.Languages.McMolangIdentifier:
                return Molang.provideHover(context);
            case ide_shared_1.Languages.McOtherIdentifier:
                break;
        }
        return undefined;
    }
}
exports.HoverService = HoverService;
//# sourceMappingURL=service.js.map