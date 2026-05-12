"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_1 = require("./parameter");
describe('Parameter', () => {
    describe('constructor', () => {
        it('should create a Parameter with default values', () => {
            const param = new parameter_1.Parameter();
            expect(param.text).toBe('');
            expect(param.offset).toBe(0);
        });
        it('should create a Parameter with text only', () => {
            const param = new parameter_1.Parameter('test');
            expect(param.text).toBe('test');
            expect(param.offset).toBe(0);
        });
        it('should create a Parameter with text and offset', () => {
            const param = new parameter_1.Parameter('command', 10);
            expect(param.text).toBe('command');
            expect(param.offset).toBe(10);
        });
        it('should create a Parameter with empty string and offset', () => {
            const param = new parameter_1.Parameter('', 5);
            expect(param.text).toBe('');
            expect(param.offset).toBe(5);
        });
    });
    describe('Parameter.is', () => {
        it('should return true for valid Parameter instance', () => {
            const param = new parameter_1.Parameter('test', 5);
            expect(parameter_1.Parameter.is(param)).toBe(true);
        });
        it('should return true for object with text and offset properties', () => {
            const obj = { text: 'hello', offset: 10 };
            expect(parameter_1.Parameter.is(obj)).toBe(true);
        });
        it('should return false for null', () => {
            expect(parameter_1.Parameter.is(null)).toBe(false);
        });
        it('should return false for undefined', () => {
            expect(parameter_1.Parameter.is(undefined)).toBe(false);
        });
        it('should return false for object missing text property', () => {
            const obj = { offset: 5 };
            expect(parameter_1.Parameter.is(obj)).toBe(false);
        });
        it('should return false for object missing offset property', () => {
            const obj = { text: 'test' };
            expect(parameter_1.Parameter.is(obj)).toBe(false);
        });
        it('should return false for object with wrong text type', () => {
            const obj = { text: 123, offset: 5 };
            expect(parameter_1.Parameter.is(obj)).toBe(false);
        });
        it('should return false for object with wrong offset type', () => {
            const obj = { text: 'test', offset: 'not a number' };
            expect(parameter_1.Parameter.is(obj)).toBe(false);
        });
        it('should return false for empty object', () => {
            expect(parameter_1.Parameter.is({})).toBe(false);
        });
        it('should return false for string', () => {
            expect(parameter_1.Parameter.is('test')).toBe(false);
        });
        it('should return false for number', () => {
            expect(parameter_1.Parameter.is(42)).toBe(false);
        });
        it('should return false for array', () => {
            expect(parameter_1.Parameter.is([])).toBe(false);
        });
        it('should return true for object with extra properties', () => {
            const obj = { text: 'test', offset: 5, extra: 'property' };
            expect(parameter_1.Parameter.is(obj)).toBe(true);
        });
    });
    describe('property assignment', () => {
        it('should allow modifying text property', () => {
            const param = new parameter_1.Parameter('initial', 0);
            param.text = 'modified';
            expect(param.text).toBe('modified');
        });
        it('should allow modifying offset property', () => {
            const param = new parameter_1.Parameter('test', 0);
            param.offset = 20;
            expect(param.offset).toBe(20);
        });
    });
});
//# sourceMappingURL=parameter.test.js.map