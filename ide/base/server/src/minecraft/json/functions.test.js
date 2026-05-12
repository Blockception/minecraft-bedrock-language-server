"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
describe('Json Functions', () => {
    describe('getCurrentElement', () => {
        const data = `{"foo":"/example foo"}`;
        for (let i = 8; i < 20; i++) {
            test(`Should be able to get the element at ${i}`, () => {
                const range = (0, functions_1.getCurrentElement)(data, i);
                expect(range).toBeDefined();
                if (!range)
                    return;
                const text = data.slice(range.start, range.end);
                expect(text).toEqual('/example foo');
            });
        }
    });
    describe('getCurrentString', () => {
        const data = `{"foo":"/example foo"}`;
        for (let i = 8; i < 20; i++) {
            test(`Should be able to get the element at ${i}`, () => {
                const range = (0, functions_1.getCurrentString)(data, i);
                expect(range).toBeDefined();
                if (!range)
                    return;
                const text = data.slice(range.start, range.end);
                expect(text).toEqual('/example foo');
            });
        }
    });
    describe('getCurrentStringValue', () => {
        const data = `{"foo":"/example foo"}`;
        for (let i = 8; i < 20; i++) {
            test(`Should be able to get the element at ${i}`, () => {
                const range = (0, functions_1.getCurrentStringValue)(data, 'foo', i);
                expect(range).toBeDefined();
                if (!range)
                    return;
                const text = data.slice(range.start, range.end);
                expect(text).toEqual('/example foo');
            });
        }
    });
});
//# sourceMappingURL=functions.test.js.map