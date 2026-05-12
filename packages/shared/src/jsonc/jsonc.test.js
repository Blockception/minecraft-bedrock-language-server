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
const jsonc_1 = require("./jsonc");
const jsoncModule = __importStar(require("jsonc"));
describe('Json', () => {
    describe('To', () => {
        const data = `{"id":"controller.example","documentation":"example"}`;
        const obj = jsonc_1.Json.To(data);
        it('should parse valid JSON', () => {
            expect(obj).toBeDefined();
        });
        if (!obj)
            return;
        it('should parse fields correctly', () => {
            expect(obj.documentation).toEqual('example');
            expect(obj.id).toEqual('controller.example');
        });
    });
    describe('To with TextDocument', () => {
        const data = `{"id":"controller.example","documentation":"example"}`;
        const obj = jsonc_1.Json.To({ getText: () => data, uri: 'example' });
        it('should parse valid JSON from TextDocument', () => {
            expect(obj).toBeDefined();
        });
        if (!obj)
            return;
        it('should parse fields correctly from TextDocument', () => {
            expect(obj.documentation).toEqual('example');
            expect(obj.id).toEqual('controller.example');
        });
    });
    describe('To with JSONC (comments)', () => {
        const data = `{
      // This is a comment
      "id": "controller.example",
      /* Another comment */
      "documentation": "example"
    }`;
        const obj = jsonc_1.Json.To(data);
        it('should parse JSONC with comments', () => {
            expect(obj).toBeDefined();
        });
        if (!obj)
            return;
        it('should parse fields correctly from JSONC', () => {
            expect(obj.documentation).toEqual('example');
            expect(obj.id).toEqual('controller.example');
        });
    });
    describe('parse', () => {
        it('should parse basic JSON', () => {
            const result = jsonc_1.Json.parse('{"key": "value"}');
            expect(result).toEqual({ key: 'value' });
        });
        it('should parse JSONC with comments when stripComments is true', () => {
            const result = jsonc_1.Json.parse('{"key": "value" /* comment */}', { stripComments: true });
            expect(result).toEqual({ key: 'value' });
        });
    });
    describe('To with invalid JSON', () => {
        const originalConsoleError = console.error;
        beforeEach(() => {
            console.error = jest.fn();
        });
        afterEach(() => {
            console.error = originalConsoleError;
        });
        it('should handle invalid JSON string', () => {
            const data = `{invalid json}`;
            const obj = jsonc_1.Json.To(data);
            expect(obj).toBeUndefined();
            expect(console.error).toHaveBeenCalled();
        });
        it('should handle invalid JSON from TextDocument', () => {
            const data = `{invalid json}`;
            const obj = jsonc_1.Json.To({ getText: () => data, uri: 'test://invalid.json' });
            expect(obj).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Cannot cast file to json: test://invalid.json'));
        });
        it('should handle empty string', () => {
            const obj = jsonc_1.Json.To('');
            expect(obj).toBeUndefined();
        });
        it('should handle error without message property', () => {
            // Mock jsonc.parse to throw an error without message property
            const mockError = { code: 'SOME_ERROR' };
            const parseSpy = jest.spyOn(jsoncModule.jsonc, 'parse').mockImplementation(() => {
                throw mockError;
            });
            const obj = jsonc_1.Json.To('test');
            expect(obj).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(mockError)));
            // Restore original parse
            parseSpy.mockRestore();
        });
    });
});
//# sourceMappingURL=jsonc.test.js.map