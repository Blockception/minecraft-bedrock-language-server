"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const molang_1 = require("../../../../src/lib/diagnostics/molang");
const diagnoser_1 = require("../../../diagnoser");
describe("Molang Syntax", () => {
    const no_errors_tests = [
        {
            name: "Command with selector",
            data: {
                on_entry: ["/event entity @e[type=foo:bar] foo:update"],
            },
        },
        {
            name: "Transition with comparison",
            data: {
                transition: [{ foo: "q.property('foo:bar')==0&&q.all_animations_finished" }],
            },
        },
        {
            name: "Comparison should not be confused with assignment",
            data: {
                transition: [
                    "q.property('foo:bar')==0&&q.all_animations_finished",
                    "variable.example<=1;",
                    "variable.example>=1;",
                    "variable.example!=1;",
                    "variable.example <= 1;",
                    "variable.example >= 1;",
                    "variable.example != 1;",
                    "q.property('foo:bar')==0&&q.all_animations_finished",
                ],
            },
        },
        {
            name: "Some complex",
            data: "v.temp_outfit!=q.property('foo:bar')+q.property('foo:bar')+q.property('foo:bar')",
        },
    ];
    for (const test of no_errors_tests) {
        it(`no errors test: ${test.name}`, () => {
            const diagnoser = new diagnoser_1.TestDiagnoser();
            (0, molang_1.diagnose_molang_syntax_text)("", diagnoser, test.data);
            diagnoser.expectEmpty();
        });
    }
});
//# sourceMappingURL=syntax.test.js.map