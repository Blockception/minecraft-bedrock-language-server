"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const molang_1 = require("../../src/molang");
const dataset_valid_1 = require("../data/dataset-valid");
const vanilla_player_1 = require("../vanilla-player");
describe("MolangSet - harvest", () => {
    test.each(dataset_valid_1.valid_syntaxes)("%#. %s", (synt) => {
        const data = toMolangSet(synt);
        expect(data).toMatchSnapshot();
    }, 1000);
    test("vanilla-player", () => {
        const data = toMolangSetFrom(vanilla_player_1.VanillaPlayer.DataObject, vanilla_player_1.VanillaPlayer.Data);
        expect(data).toMatchSnapshot();
    }, 1000);
});
function toMolangSet(molangs) {
    const data = {
        scripts: {
            pre_animation: [molangs],
        },
    };
    const text = JSON.stringify(data, null, 2);
    const set = new molang_1.MolangSet();
    set.harvest(data, text);
    return set;
}
function toMolangSetFrom(object, text) {
    const set = new molang_1.MolangSet();
    set.harvest(object, text);
    return set;
}
//# sourceMappingURL=harvest.test.js.map