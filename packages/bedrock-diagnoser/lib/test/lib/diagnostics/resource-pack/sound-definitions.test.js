"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resource_pack_1 = require("../../../../src/lib/diagnostics/resource-pack/resource-pack");
const diagnoser_1 = require("../../../diagnoser");
const example_data = {
    format_version: "1.20.20",
    sound_definitions: {
        "ambient.basalt_deltas.additions": {
            category: "ambient",
            max_distance: null,
            min_distance: null,
            sounds: [
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/basaltground1",
                    volume: 0.55,
                    weight: 10,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/basaltground2",
                    volume: 0.55,
                    weight: 10,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/basaltground3",
                    volume: 0.55,
                    weight: 10,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click1",
                    volume: 0.19,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click2",
                    volume: 0.19,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click3",
                    volume: 0.19,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click4",
                    volume: 0.25,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click5",
                    volume: 0.25,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click6",
                    volume: 0.01,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click7",
                    volume: 0.01,
                    weight: 25,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/click8",
                    volume: 0.01,
                    weight: 25,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/debris1",
                    volume: 0.35,
                    weight: 40,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/debris2",
                    volume: 0.35,
                    weight: 40,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/debris3",
                    volume: 0.35,
                    weight: 40,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/heavy_click1",
                    volume: 0.25,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/heavy_click2",
                    volume: 0.25,
                    weight: 20,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/long_debris1",
                    volume: 0.35,
                    weight: 40,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/long_debris2",
                    volume: 0.35,
                    weight: 40,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/plode1",
                    volume: 0.5,
                    weight: 10,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/plode2",
                    volume: 0.5,
                    weight: 10,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/plode3",
                    volume: 0.5,
                    weight: 10,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/twist1",
                    volume: 0.66,
                    weight: 1,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/twist2",
                    volume: 0.66,
                    weight: 1,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/twist3",
                    volume: 0.77,
                    weight: 1,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/twist4",
                    volume: 0.66,
                    weight: 1,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/soulsand_valley/wind1",
                    volume: 0.3,
                    weight: 25,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/soulsand_valley/wind2",
                    volume: 0.25,
                    weight: 25,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/soulsand_valley/wind3",
                    volume: 0.25,
                    weight: 25,
                },
                {
                    is3D: false,
                    name: "sounds/ambient/nether/soulsand_valley/wind4",
                    volume: 0.3,
                    weight: 25,
                },
            ],
        },
        "ambient.basalt_deltas.loop": {
            category: "ambient",
            max_distance: null,
            min_distance: null,
            sounds: [
                {
                    is3D: false,
                    name: "sounds/ambient/nether/basalt_deltas/ambience",
                    stream: true,
                    volume: 4.0,
                },
            ],
        },
        "ambient.basalt_deltas.mood": {
            category: "ambient",
            max_distance: null,
            min_distance: null,
            sounds: [
                "sounds/ambient/nether/nether_wastes/mood1",
                "sounds/ambient/nether/nether_wastes/mood2",
                "sounds/ambient/nether/nether_wastes/mood3",
                "sounds/ambient/nether/nether_wastes/mood4",
            ],
        },
        "ambient.foo.bar": {
            category: "ambient",
            max_distance: null,
            min_distance: null,
            sounds: [
                "sounds/foo/bar"
            ]
        }
    },
};
describe("sound definitions", () => {
    const doc = {
        uri: path_1.default.join("resource_pack", "sounds", "sound_definitions.json"),
        getText: () => JSON.stringify(example_data, undefined, 2),
    };
    test("Vanilla files and custom definition should be valid", () => {
        const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
        diagnoser.context.getFiles = () => ["sounds/foo/bar"];
        expect(resource_pack_1.ResourcePack.diagnose_document(diagnoser)).toBeTruthy();
        diagnoser.expectEmpty();
    });
    test("Missing custom definitions should raise errors", () => {
        const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
        diagnoser.context.getFiles = () => [];
        expect(resource_pack_1.ResourcePack.diagnose_document(diagnoser)).toBeTruthy();
        diagnoser.expectAmount(1);
    });
});
//# sourceMappingURL=sound-definitions.test.js.map