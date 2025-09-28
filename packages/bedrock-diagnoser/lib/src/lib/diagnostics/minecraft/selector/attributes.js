"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = exports.attribute_diagnostics = void 0;
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
const entity_1 = require("../../behavior-pack/entity");
const general_1 = require("../../general");
const mode_1 = require("../../mode");
const family_1 = require("../family");
const name_1 = require("../name");
const tag_1 = require("../tag");
const checks_1 = require("./checks");
const coordinate_1 = require("./coordinate");
const general_2 = require("./general");
const has_property_1 = require("./has_property");
const hasitem_1 = require("./hasitem");
const scores_1 = require("./scores");
const util_1 = require("./util");
function float_diagnose(range) {
    return (0, util_1.must_offset_word)((value, diagnoser) => (0, general_1.general_float_diagnose)(value, diagnoser, range));
}
exports.attribute_diagnostics = {
    c: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(general_1.general_integer_diagnose)),
    dx: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(coordinate_1.selectorattribute_coordinate)),
    dy: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(coordinate_1.selectorattribute_coordinate)),
    dz: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(coordinate_1.selectorattribute_coordinate)),
    family: (0, util_1.all)(general_2.selectorattribute_duplicate_check, (0, util_1.must_offset_word)(family_1.minecraft_family_diagnose)),
    has_property: (0, util_1.all)((0, util_1.forEach)(has_property_1.minecraft_selector_has_property_diagnose)),
    hasitem: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.forEach)(hasitem_1.minecraft_selector_hasitem_diagnose)),
    l: (0, util_1.all)(general_2.selectorattribute_duplicate_check, (0, util_1.must_offset_word)(general_1.general_integer_diagnose)),
    lm: (0, util_1.all)(general_2.selectorattribute_duplicate_check, (0, util_1.must_offset_word)(general_1.general_integer_diagnose)),
    m: (0, util_1.all)(general_2.selectorattribute_one_positive_all_negatives, (0, util_1.must_offset_word)(mode_1.mode_gamemode_diagnose)),
    name: (0, util_1.all)(general_2.selectorattribute_one_positive_all_negatives, (0, util_1.must_offset_word)(name_1.minecraft_name_diagnose)),
    r: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(general_1.general_positive_float_diagnose)),
    rm: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(general_1.general_positive_float_diagnose)),
    rx: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, float_diagnose({ min: -90, max: 90 })),
    rxm: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, float_diagnose({ min: -90, max: 90 })),
    ry: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, float_diagnose({ min: -180, max: 180 })),
    rym: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, float_diagnose({ min: -180, max: 180 })),
    scores: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.forEach)(scores_1.selector_scores_diagnose)),
    tag: (0, util_1.all)(general_2.selectorattribute_duplicate_check, (0, util_1.must_offset_word)(tag_1.minecraft_tag_diagnose)),
    type: (0, util_1.all)(general_2.selectorattribute_one_positive_all_negatives, (0, util_1.must_offset_word)(entity_1.behaviorpack_entityid_diagnose)),
    x: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(coordinate_1.selectorattribute_coordinate)),
    y: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(coordinate_1.selectorattribute_coordinate)),
    z: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, (0, util_1.must_offset_word)(coordinate_1.selectorattribute_coordinate)),
};
var Attribute;
(function (Attribute) {
    function diagnose(attribute, attributes, sel, diagnoser) {
        const fn = exports.attribute_diagnostics[attribute];
        if (typeof fn === "function") {
            return fn(attributes, sel, diagnoser);
        }
        attributes.forEach((a) => diagnoser.add(json_1.CompactJson.toOffsetWord(a), `Unknown attribute: ${attribute}`, types_1.DiagnosticSeverity.error, "minecraft.selector.attribute.unknown"));
        return false;
    }
    Attribute.diagnose = diagnose;
})(Attribute || (exports.Attribute = Attribute = {}));
//# sourceMappingURL=attributes.js.map