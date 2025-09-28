"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const parse_1 = require("../../src/molang/syntax/parse");
const dataset_valid_1 = require("../data/dataset-valid");
const mermaid_1 = require("../../src/graph/mermaid");
describe("molang - mermaid - graphs", () => {
    describe("should be able to generate stage diagrams", () => {
        test.each(dataset_valid_1.valid_syntaxes)("%#. %s", (s) => {
            const n = (0, parse_1.parseMolang)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(s, 0));
            n.forEach((item) => {
                expect((0, mermaid_1.generateMermaidDiagram)(item, {
                    direction: "TD",
                    showPosition: true,
                })).toMatchSnapshot();
            });
        });
    });
});
//# sourceMappingURL=mermaid.test.js.map