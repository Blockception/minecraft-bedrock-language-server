"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../../../../src/internal/json");
const Internal = __importStar(require("../../../../src/internal/behavior-pack/entity"));
const behavior_pack_1 = require("../../../../src/project/behavior-pack");
const EntityJson = `{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "blockception:sheep",
      "is_spawnable": true,
      "is_summonable": true,
      "animations": {
        "controller": "controller.animation.chicken",
        "something": "controller.i.dont.exist"
      },
      "scripts": {
        "animate": ["controller"]
      }
    },
    "component_groups": {
      "self:group1": {
        "minecraft:type_family": {
          "family": ["animal"]
        }
      }
    },
    "components": {
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:type_family": {
        "family": ["mob"]
      }
    },
    "events": {
      "self:to": {}
    }
  }
}`;
const EntityDoc = {
    uri: "C:\\temp.json",
    getText: () => EntityJson,
};
describe("Entity", () => {
    describe("Data", () => {
        const imp = json_1.Json.To(EntityJson);
        it("Not Undefined", () => {
            expect(imp).toBeDefined();
        });
        it("Is entity", () => {
            expect(Internal.Entity.is(imp)).toBeTruthy();
        });
    });
    test("Families", () => {
        const data = behavior_pack_1.Entity.process(EntityDoc);
        expect(data).toMatchSnapshot();
    });
});
//# sourceMappingURL=entity.test.js.map