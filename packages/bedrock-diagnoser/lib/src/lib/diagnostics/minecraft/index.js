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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.Selector = exports.Filter = void 0;
/*	Auto generated	*/
__exportStar(require("./animation"), exports);
__exportStar(require("./animation-controllers"), exports);
__exportStar(require("./commands"), exports);
__exportStar(require("./coordinate"), exports);
__exportStar(require("./effect"), exports);
__exportStar(require("./fake-entity"), exports);
__exportStar(require("./family"), exports);
exports.Filter = __importStar(require("./filter/index"));
__exportStar(require("./items"), exports);
__exportStar(require("./json-item"), exports);
__exportStar(require("./json-rawtext"), exports);
__exportStar(require("./language"), exports);
__exportStar(require("./manifest"), exports);
__exportStar(require("./name"), exports);
__exportStar(require("./objective"), exports);
__exportStar(require("./script"), exports);
__exportStar(require("./selector"), exports);
exports.Selector = __importStar(require("./selector/index"));
__exportStar(require("./tag"), exports);
__exportStar(require("./tickingarea"), exports);
__exportStar(require("./xp"), exports);
//# sourceMappingURL=index.js.map