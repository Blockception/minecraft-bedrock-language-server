"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
describe('General', () => {
    describe('getQueries', () => {
        const queries = ['unhappy_counter', 'time_of_day', 'swelling_dir'];
        queries.forEach((item) => it(`getQuery should return ${item}`, () => {
            expect(src_1.General.getQuery(item)).toBeDefined();
        }));
    });
    describe('getMath', () => {
        const math = ['abs', 'cos', 'sin'];
        math.forEach((item) => it(item, () => {
            expect(src_1.General.getMath(item)).toBeDefined();
        }));
    });
});
//# sourceMappingURL=general.test.js.map