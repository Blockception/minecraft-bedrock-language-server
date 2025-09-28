"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resource_pack_1 = require("../../../../src/lib/diagnostics/resource-pack/resource-pack");
const diagnoser_1 = require("../../../diagnoser");
describe("ResourcePack", () => {
    describe("Animation", () => {
        it("returns errors for the times outside of the animation_length", () => {
            // One time is outside of the animation_length
            // One time is inside of the animation_length
            const doc = {
                uri: path_1.default.join("resource_pack", "animations", "test.animation.json"),
                getText: () => `{
          "format_version": "1.8.0",
          "animations": {
            "animation.agent.shrug": {
              "animation_length": 1.25,
              "bones": {
                "head": {
                  "rotation": {
                    "0.3333": [ 0, 0, 0 ],
                    "1.5": [ 0, 0, 0 ]
                  }
                }
              }
            }
          }
        }`,
            };
            const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
            resource_pack_1.ResourcePack.diagnose_document(diagnoser);
            diagnoser.expectAmount(2);
            const item = diagnoser.getSeverity(3);
            expect(item).toBeDefined();
            if (item === undefined)
                return;
            expect(item.message).toEqual("Time value of bone 1.5 is greater than the animation length: 1.25");
            expect(item.position).toEqual("animation.agent.shrug/head/1.5");
        });
    });
});
//# sourceMappingURL=animation.test.js.map