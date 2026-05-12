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
exports.onCompletionRequest = onCompletionRequest;
const ide_shared_1 = require("@blockception/ide-shared");
const Json = __importStar(require("./minecraft/json/document"));
const Language = __importStar(require("./minecraft/language/language"));
const Mcfunction = __importStar(require("./minecraft/mcfunctions/mcfunctions"));
const MCProject = __importStar(require("./minecraft/mcproject/mcproject"));
const Molang = __importStar(require("./minecraft/molang/main"));
function onCompletionRequest(context) {
    switch (context.document.languageId) {
        case ide_shared_1.Languages.McLanguageIdentifier:
            return Language.provideCompletion(context);
        case ide_shared_1.Languages.McFunctionIdentifier:
            return Mcfunction.provideCompletion(context);
        case ide_shared_1.Languages.McProjectIdentifier:
            return MCProject.provideCompletion(context);
        case ide_shared_1.Languages.McMolangIdentifier:
            return Molang.provideDocCompletion(context);
        case ide_shared_1.Languages.JsonCIdentifier:
        case ide_shared_1.Languages.JsonIdentifier:
            return Json.provideCompletionDocument(context);
    }
}
//# sourceMappingURL=on-request.js.map