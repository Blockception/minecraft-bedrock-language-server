"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnRule = void 0;
/**
 *
 */
var SpawnRule;
(function (SpawnRule) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:spawn_rules"] === "object") {
            const desc = value["minecraft:spawn_rules"].description;
            if (typeof desc === "object" && typeof desc.identifier === "string" && Array.isArray(value['minecraft:spawn_rules'].conditions)) {
                return true;
            }
        }
        return false;
    }
    SpawnRule.is = is;
})(SpawnRule || (exports.SpawnRule = SpawnRule = {}));
//# sourceMappingURL=spawn_rule.js.map