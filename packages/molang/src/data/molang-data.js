"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolangData = exports.MolangDataSet = void 0;
const animations_1 = require("./animations");
const animations_controllers_1 = require("./animations-controllers");
const attachables_1 = require("./attachables");
const blocks_1 = require("./blocks");
const entities_1 = require("./entities");
const features_rules_1 = require("./features-rules");
const general_1 = require("./general");
const items_1 = require("./items");
const particles_1 = require("./particles");
const render_controllers_1 = require("./render-controllers");
var MolangDataSet;
(function (MolangDataSet) {
    /**
     * Tries to get one of the fields from the molangdataset from a range of values
     * @param s The set of data
     * @param k a value like: `v`, `variable`, etc
     * @returns The found data set or undefined if an unknown value is passed
     */
    function get(s, k) {
        switch (k.toLowerCase()) {
            case 'v':
            case 'variable':
            case 'variables':
                return s.Variables;
            case 'c':
            case 'context':
            case 'contexts':
                return s.Contexts;
            case 't':
            case 'temp':
            case 'temps':
                return s.Temps;
        }
        return undefined;
    }
    MolangDataSet.get = get;
})(MolangDataSet || (exports.MolangDataSet = MolangDataSet = {}));
/**
 * Molang data for all types
 */
var MolangData;
(function (MolangData) {
    /**Molang data for animations*/
    MolangData.Animations = animations_1.Animations;
    /**Molang data for animations controllers*/
    MolangData.AnimationsControllers = animations_controllers_1.AnimationsControllers;
    /**Molang data for attachables*/
    MolangData.Attachables = attachables_1.Attachables;
    /**Molang data for blocks*/
    MolangData.Blocks = blocks_1.Blocks;
    /**Molang data for entities*/
    MolangData.Entities = entities_1.Entities;
    /**Molang data for features rules*/
    MolangData.FeaturesRules = features_rules_1.FeaturesRules;
    /**Molang data for general*/
    MolangData.General = general_1.General;
    /**Molang data for items*/
    MolangData.Items = items_1.Items;
    /**Molang data for particles*/
    MolangData.Particles = particles_1.Particles;
    /**Molang data for render controllers*/
    MolangData.RenderControllers = render_controllers_1.RenderControllers;
    /** Returns the specified type of molang data */
    function get(type) {
        return MolangData[type] || emptySet;
    }
    MolangData.get = get;
})(MolangData || (exports.MolangData = MolangData = {}));
const emptySet = {
    Variables: [],
    Contexts: [],
    Temps: [],
};
//# sourceMappingURL=molang-data.js.map