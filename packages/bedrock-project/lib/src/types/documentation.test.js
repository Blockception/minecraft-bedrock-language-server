"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentation_1 = require("./documentation");
describe("Documentation", () => {
    describe("Json", () => {
        const exampleDoc = {
            uri: "c:\\exampe.json",
            getText: () => `//I am the firstline comment
      {
        //I am the second comment
        "property": "some value" //I am the thrid comment
      }`,
        };
        const example2Doc = {
            uri: "c:\\exampe.json",
            getText: () => `//I am the firstline comment
      {
        //I am the second comment
        "property": "some value"
      }`,
        };
        it("First Line", () => {
            expect(documentation_1.Documentation.getDoc(exampleDoc)).toEqual("I am the firstline comment");
        });
        it("Second Line", () => {
            const index = example2Doc.getText().indexOf("property");
            expect(documentation_1.Documentation.getDoc(example2Doc, undefined, index)).toEqual("I am the second comment");
        });
        it("Thrid Line", () => {
            const index = exampleDoc.getText().indexOf("property");
            expect(documentation_1.Documentation.getDoc(exampleDoc, undefined, index)).toEqual("I am the thrid comment");
        });
    });
    describe("Mcfunction", () => {
        const exampleDoc = {
            uri: "c:\\exampe.mcfunction",
            getText: () => `## I am the firstline comment
##I am the second comment
scoreboard players set global id 0 ##I am the thrid comment`,
        };
        const example2Doc = {
            uri: "c:\\exampe.mcfunction",
            getText: () => `## I am the firstline comment
##I am the second comment
scoreboard players set global id 0`,
        };
        it("First Line", () => {
            expect(documentation_1.Documentation.getDoc(exampleDoc)).toEqual("I am the firstline comment");
        });
        it("Second Line", () => {
            const index = example2Doc.getText().indexOf("scoreboard");
            expect(documentation_1.Documentation.getDoc(example2Doc, undefined, index)).toEqual("I am the second comment");
        });
        it("Thrid Line", () => {
            const index = exampleDoc.getText().indexOf("scoreboard");
            expect(documentation_1.Documentation.getDoc(exampleDoc, undefined, index)).toEqual("I am the thrid comment");
        });
    });
});
//# sourceMappingURL=documentation.test.js.map