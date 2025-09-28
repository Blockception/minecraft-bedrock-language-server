import { Documentation } from './documentation';
import { TextDocument } from './text-document';

describe("Documentation", () => {
  describe("Json", () => {
    const exampleDoc: TextDocument = {
      uri: "c:\\exampe.json",
      getText: () => `//I am the firstline comment
      {
        //I am the second comment
        "property": "some value" //I am the thrid comment
      }`,
    };
    const example2Doc: TextDocument = {
      uri: "c:\\exampe.json",
      getText: () => `//I am the firstline comment
      {
        //I am the second comment
        "property": "some value"
      }`,
    };

    it("First Line", () => {
      expect(Documentation.getDoc(exampleDoc)).toEqual("I am the firstline comment");
    });

    it("Second Line", () => {
      const index = example2Doc.getText().indexOf("property");
      expect(Documentation.getDoc(example2Doc, undefined, index)).toEqual("I am the second comment");
    });

    it("Thrid Line", () => {
      const index = exampleDoc.getText().indexOf("property");
      expect(Documentation.getDoc(exampleDoc, undefined, index)).toEqual("I am the thrid comment");
    });
  });

  describe("Mcfunction", () => {
    const exampleDoc: TextDocument = {
      uri: "c:\\exampe.mcfunction",
      getText: () => `## I am the firstline comment
##I am the second comment
scoreboard players set global id 0 ##I am the thrid comment`,
    };
    const example2Doc: TextDocument = {
      uri: "c:\\exampe.mcfunction",
      getText: () => `## I am the firstline comment
##I am the second comment
scoreboard players set global id 0`,
    };

    it("First Line", () => {
      expect(Documentation.getDoc(exampleDoc)).toEqual("I am the firstline comment");
    });

    it("Second Line", () => {
      const index = example2Doc.getText().indexOf("scoreboard");
      expect(Documentation.getDoc(example2Doc, undefined, index)).toEqual("I am the second comment");
    });

    it("Thrid Line", () => {
      const index = exampleDoc.getText().indexOf("scoreboard");
      expect(Documentation.getDoc(exampleDoc, undefined, index)).toEqual("I am the thrid comment");
    });
  });
});
