"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attribute_hasitem_diagnostics = void 0;
exports.minecraft_selector_hasitem_diagnose = minecraft_selector_hasitem_diagnose;
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
const diagnose_1 = require("../../behavior-pack/item/diagnose");
const general_1 = require("../../general");
const diagnose_2 = require("../../mode/diagnose");
const checks_1 = require("./checks");
const general_2 = require("./general");
const util_1 = require("./util");
function integer_diagnose(range) {
    return (0, util_1.must_offset_word)((value, diagnoser) => (0, general_1.general_integer_diagnose)(value, diagnoser, range));
}
function range_integer_diagnose(range) {
    return (0, util_1.must_offset_word)((value, diagnoser) => (0, general_1.general_range_integer_diagnose)(value, diagnoser, range));
}
exports.attribute_hasitem_diagnostics = {
    item: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, general_2.selectorattribute_no_negatives, (0, util_1.must_offset_word)(diagnose_1.behaviorpack_item_diagnose)),
    //Has extra checks down below
    data: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, general_2.selectorattribute_no_negatives, integer_diagnose({ min: -1, max: 32767 })),
    quantity: (0, util_1.all)(general_2.selectorattribute_one_positive_all_negatives, range_integer_diagnose({ min: 0, max: 32767 })),
    location: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, general_2.selectorattribute_one_positive_all_negatives, (0, util_1.must_offset_word)(diagnose_2.mode_slot_type_diagnose)),
    //Has extra checks down below
    slot: (0, util_1.all)(checks_1.selectorattributes_no_duplicate, general_2.selectorattribute_one_positive_all_negatives, integer_diagnose({ min: 0, max: 53 })),
};
/**
 * Diagnoses the hasitem selector attribute
 * @param attr
 * @param sel
 * @param diagnoser
 */
function minecraft_selector_hasitem_diagnose(attr, sel, diagnoser) {
    if (json_1.CompactJson.isString(attr)) {
        diagnoser.add(json_1.CompactJson.toOffsetWord(attr), "The hasitem attribute needs to be either a array or object", types_1.DiagnosticSeverity.error, "minecraft.selector.hasitem.type");
        return false;
    }
    if (json_1.CompactJson.isObject(attr)) {
        return diagnose_hasitem_object(attr, sel, diagnoser);
    }
    let result = true;
    if (json_1.CompactJson.isArray(attr)) {
        for (const a of attr.value) {
            //Sub items need to be a object
            if (json_1.CompactJson.isObject(a)) {
                result =
                    diagnose_hasitem_object(json_1.CompactJson.toKeyed(a, "hasitem"), sel, diagnoser) && result;
            }
            else {
                diagnoser.add(json_1.CompactJson.toOffsetWord(a), "Expected a object", types_1.DiagnosticSeverity.error, "minecraft.selector.hasitem.type");
                result = false;
            }
        }
    }
    return result;
}
function diagnose_hasitem_object(attr, sel, diagnoser) {
    let result = true;
    const reader = new json_1.CompactJsonReader(attr);
    //Hasitem needs to contain the item attribute
    if (!reader.contains("item")) {
        diagnoser.add(json_1.CompactJson.toOffsetWord(attr), "Missing item selector attribute", types_1.DiagnosticSeverity.error, "minecraft.selector.hasitem.item.missing");
        result = false;
    }
    const names = reader.names();
    for (const name of names) {
        const checks = exports.attribute_hasitem_diagnostics[name];
        const attrs = reader.get(name);
        if (checks) {
            result = checks(attrs, sel, diagnoser) && result;
        }
        else {
            result = defaultAttribute(name, attrs, sel, diagnoser) && result;
        }
        //If still good we check perform additional checks
        if (result) {
            switch (name) {
                case "data":
                    result = diagnose_hasitem_data(attrs, reader, diagnoser) && result;
                    break;
                case "slot":
                    result = diagnose_hasitem_slot(attrs, reader, diagnoser) && result;
                    break;
            }
        }
    }
    return result;
}
function defaultAttribute(attribute, attributes, sel, diagnoser) {
    const msg = `Unknown attribute: ${attribute}`;
    attributes.forEach((a) => {
        diagnoser.add(json_1.CompactJson.toOffsetWord(a), msg, types_1.DiagnosticSeverity.error, "minecraft.selector.hasitem.attribute.invalid");
    });
    return false;
}
function diagnose_hasitem_data(attrs, reader, diagnoser) {
    let result = true;
    const item = reader.get("item");
    if (item.length !== 1) {
        return false;
    }
    const itemWord = json_1.CompactJson.valueToOffsetWord(item[0]);
    attrs.forEach((a) => {
        if (json_1.CompactJson.isString(a)) {
            itemWord.data = parseInt(a.value);
            result = (0, diagnose_1.behaviorpack_item_diagnose)(itemWord, diagnoser) && result;
        }
    });
    return result;
}
function diagnose_hasitem_slot(attrs, reader, diagnoser) {
    let result = true;
    const location = reader.get("location");
    if (location.length !== 1) {
        return false;
    }
    const locationWord = json_1.CompactJson.valueToOffsetWord(location[0]);
    attrs.forEach((a) => {
        if (json_1.CompactJson.isString(a)) {
            result = (0, diagnose_2.mode_slotid_diagnose)(locationWord, a.value, diagnoser) && result;
        }
    });
    return result;
}
//# sourceMappingURL=hasitem.js.map