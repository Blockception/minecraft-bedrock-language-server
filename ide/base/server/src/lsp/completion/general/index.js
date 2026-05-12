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
exports.Xp = exports.Tickingareas = exports.Tags = exports.Strings = exports.Sounds = exports.Objectives = exports.Names = exports.Manifests = exports.Integer = exports.Float = exports.Fake = exports.Effect = exports.Coordinate = exports.Boolean = void 0;
exports.Boolean = __importStar(require("./boolean"));
exports.Coordinate = __importStar(require("./coordinate"));
exports.Effect = __importStar(require("./effect"));
exports.Fake = __importStar(require("./fake-entity"));
exports.Float = __importStar(require("./float"));
exports.Integer = __importStar(require("./integer"));
exports.Manifests = __importStar(require("./manifests"));
exports.Names = __importStar(require("./names"));
exports.Objectives = __importStar(require("./objectives"));
exports.Sounds = __importStar(require("./sounds"));
exports.Strings = __importStar(require("./strings"));
exports.Tags = __importStar(require("./tags"));
exports.Tickingareas = __importStar(require("./tickingareas"));
exports.Xp = __importStar(require("./xp"));
//# sourceMappingURL=index.js.map