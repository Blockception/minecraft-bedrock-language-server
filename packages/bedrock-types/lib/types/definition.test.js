"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Definition", () => {
    it("getId", () => {
        const example = {
            walk: "animation.sheep.walk",
            default: "animation.sheep.default",
        };
        expect(_1.Definition.count(example)).toEqual(2);
        expect(_1.Definition.getId(example, 0)).toEqual("animation.sheep.walk");
        expect(_1.Definition.getId(example, 1)).toEqual("animation.sheep.default");
    });
    it("getIds", () => {
        const example = {
            walk: "animation.sheep.walk",
            default: "animation.sheep.default",
        };
        const keys = _1.Definition.getIds(example);
        expect(keys).toEqual(expect.arrayContaining(["animation.sheep.walk", "animation.sheep.default"]));
    });
    it("getReference", () => {
        const example = {
            walk: "animation.sheep.walk",
            default: "animation.sheep.default",
        };
        expect(_1.Definition.count(example)).toEqual(2);
        expect(_1.Definition.getReference(example, 0)).toEqual("walk");
        expect(_1.Definition.getReference(example, 1)).toEqual("default");
    });
    it("getReferences", () => {
        const example = {
            walk: "animation.sheep.walk",
            default: "animation.sheep.default",
        };
        const keys = _1.Definition.getReferences(example);
        expect(keys).toEqual(expect.arrayContaining(["walk", "default"]));
    });
    it("foreach", () => {
        const example = {
            walk: "animation.sheep.walk",
            default: "animation.sheep.default",
        };
        const ids = [];
        const references = [];
        _1.Definition.forEach(example, (reference, id) => {
            ids.push(id);
            references.push(reference);
        });
        expect(ids).toEqual(expect.arrayContaining(["animation.sheep.walk", "animation.sheep.default"]));
        expect(references).toEqual(expect.arrayContaining(["walk", "default"]));
    });
});
//# sourceMappingURL=definition.test.js.map