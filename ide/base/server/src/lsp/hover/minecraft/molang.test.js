"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../documents/factory");
const logger_1 = require("../../logger/logger");
const molang_1 = require("./molang");
describe('Molang', () => {
    const factory = new factory_1.TextDocumentFactory(new logger_1.ExtendedLogger(console), null);
    const context = {
        document: factory.create('some', 'json', 0, 'query.is_baby'),
    };
    test('Hover At', () => {
        expect((0, molang_1.provideHoverAt)(context, 'query.is_baby', { start: 5, end: 18 }, 10 + 5)).toBeDefined();
        expect((0, molang_1.provideHoverAt)(context, '!query.is_baby', { start: 5, end: 18 }, 2 + 5)).toBeDefined();
        expect((0, molang_1.provideHoverAt)(context, '!query.is_baby', { start: 5, end: 18 }, 10 + 5)).toBeDefined();
        expect((0, molang_1.provideHoverAt)(context, 'query.is_baby && query.is_baby', { start: 5, end: 18 }, 20 + 5)).toBeDefined();
        expect((0, molang_1.provideHoverAt)(context, 'query.is_baby && !query.is_baby', { start: 5, end: 18 }, 26 + 5)).toBeDefined();
    });
});
//# sourceMappingURL=molang.test.js.map