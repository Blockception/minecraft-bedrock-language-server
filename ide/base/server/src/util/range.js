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
exports.Range = void 0;
const vsp = __importStar(require("vscode-languageserver"));
/**
 *
 */
var Range;
(function (Range) {
    /**
     *
     * @param range
     * @param position
     * @returns
     */
    function Within(range, position) {
        if (vsp.Location.is(range)) {
            range = range.range;
        }
        if (typeof position === 'number') {
            //number check, assumes it on the same line
            if (range.start.character > position)
                return false;
            if (range.end.character < position)
                return false;
        }
        else {
            //Position check
            if (range.start.line > position.line)
                return false;
            if (range.start.line == position.line && range.start.character > position.character)
                return false;
            if (range.end.line < position.line)
                return false;
            if (range.end.line == position.line && range.end.character < position.character)
                return false;
        }
        return true;
    }
    Range.Within = Within;
})(Range || (exports.Range = Range = {}));
//# sourceMappingURL=range.js.map