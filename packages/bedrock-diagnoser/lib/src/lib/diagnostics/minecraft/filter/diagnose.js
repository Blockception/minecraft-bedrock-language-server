"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_diagnose_filters = minecraft_diagnose_filters;
exports.minecraft_diagnose_filter = minecraft_diagnose_filter;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const has_biome_tag_1 = require("./filters/has_biome_tag");
const is_family_1 = require("./filters/is_family");
const has_tag_1 = require("./filters/has_tag");
const property_1 = require("./filters/property");
const has_equipment_1 = require("./filters/has_equipment");
function minecraft_diagnose_filters(value, diagnoser) {
    if (typeof value !== "object")
        return;
    bc_minecraft_bedrock_types_1.Minecraft.Filter.Filter.forEach(value, (filter) => minecraft_diagnose_filter(filter, diagnoser));
}
function minecraft_diagnose_filter(value, diagnoser) {
    const callFn = FilterDiagnose[value.test];
    if (callFn) {
        callFn(value, diagnoser);
    }
}
const FilterDiagnose = {
    is_family: is_family_1.diagnose_filter_is_family,
    has_tag: has_tag_1.diagnose_filter_has_tag,
    has_biome_tag: has_biome_tag_1.diagnose_filter_has_biome_tag,
    has_equipment: has_equipment_1.diagnose_filter_has_equipment,
    //Properties
    int_property: property_1.diagnose_filter_property,
    bool_property: property_1.diagnose_filter_property,
    float_property: property_1.diagnose_filter_property,
    enum_property: property_1.diagnose_filter_property,
    has_property: property_1.diagnose_filter_property,
};
//# sourceMappingURL=diagnose.js.map