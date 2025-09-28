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
exports.SkinPack = void 0;
const Manifest = __importStar(require("./manifest/entry"));
/** The namespace that deals with Skin-pack diagnostics */
var SkinPack;
(function (SkinPack) {
    /**Processes and diagnoses the given textdocument
     * @param doc The document to process / diagnose
     * @param diagnoser The diagnoser to report to
     * @returns `true` or `false` whenever or not it was successful*/
    function diagnose_document(diagnoser) {
        //retrieve filter doc type
        if (diagnoser.document.uri.endsWith("manifest.json")) {
            Manifest.Diagnose(diagnoser);
            return true;
        }
        return true;
    }
    SkinPack.diagnose_document = diagnose_document;
})(SkinPack || (exports.SkinPack = SkinPack = {}));
//# sourceMappingURL=skin-pack.js.map