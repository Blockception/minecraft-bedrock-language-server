"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRule = void 0;
/** */
var FeatureRule;
(function (FeatureRule) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.format_version === "string" && typeof value === 'object') {
            const rule = value['minecraft:feature_rules'];
            if (!rule || typeof rule != 'object')
                return false;
            const description = rule.description;
            if (typeof description == 'object' && typeof description.identifier == 'string' && typeof description.places_feature == 'string')
                return true;
        }
        return false;
    }
    FeatureRule.is = is;
})(FeatureRule || (exports.FeatureRule = FeatureRule = {}));
//# sourceMappingURL=feature_rule.js.map