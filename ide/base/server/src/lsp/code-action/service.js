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
exports.CodeActionService = void 0;
const context_1 = require("../context/context");
const base_1 = require("../services/base");
const builder_1 = require("./builder");
const fuzzy_1 = require("./fuzzy");
const types_1 = require("./types");
const BehaviorPack = __importStar(require("./minecraft/behavior-pack/main"));
const Minecraft = __importStar(require("./minecraft/code-actions"));
const Molang = __importStar(require("./minecraft/molang/main"));
const ResourcePack = __importStar(require("./minecraft/resource-pack/main"));
class CodeActionService extends base_1.BaseService {
    name = 'code-actions';
    constructor(logger, extension) {
        super(logger.withPrefix('[code-actions]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('codeActionProvider', true);
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onCodeAction(this.onCodeAction.bind(this)), connection.onCodeActionResolve(this.onCodeActionResolve.bind(this)));
    }
    onCodeActionResolve(code) {
        return code;
    }
    async onCodeAction(params, token, workDoneProgress) {
        const document = this.extension.documents.get(params.textDocument.uri);
        if (document === undefined)
            return;
        this.logger.info('checking code actions', params);
        const context = context_1.Context.create(this.extension, {
            document,
            token,
            workDoneProgress,
            ...params,
        }, {
            logger: this.logger,
        });
        const builder = new builder_1.CodeActionBuilder(params, context);
        const promises = params.context.diagnostics.map((d) => this.findAction(builder, d));
        await Promise.all(promises);
        return builder.out;
    }
    async findAction(builder, diag) {
        if (builder.context.token.isCancellationRequested)
            return;
        (0, types_1.attributes)(builder, diag);
        const code = diag.code ?? '';
        if (typeof code === 'number')
            return;
        const index = code.indexOf('.');
        const mainCode = index > -1 ? code.slice(0, index) : code;
        switch (mainCode) {
            case 'behaviorpack':
                BehaviorPack.onCodeAction(builder, diag);
                break;
            case 'resourcepack':
                ResourcePack.onCodeAction(builder, diag);
                break;
            case 'minecraft':
                Minecraft.onCodeAction(builder, diag);
                break;
            case 'molang':
                Molang.onCodeAction(builder, diag);
                break;
            case 'mcfunction':
        }
        return (0, fuzzy_1.fuzzyMatch)(builder, diag);
    }
}
exports.CodeActionService = CodeActionService;
//# sourceMappingURL=service.js.map