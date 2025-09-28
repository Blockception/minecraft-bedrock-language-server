"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../../src/molang/syntax/tokens");
const dataset_valid_1 = require("../data/dataset-valid");
describe("molang - syntax", () => {
    describe("should be able to parse and match the syntax tree generated", () => {
        test.each(dataset_valid_1.valid_syntaxes)("%#. %s", (s) => {
            const n = (0, tokens_1.tokenize)(s);
            expect(n.map(item => `${item.value} ${tokens_1.TokenType[item.type]}`)).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=tokens.test.js.map