"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const recipes = [
    'minecraft:recipe_furnace',
    'minecraft:recipe_brewing_container',
    'minecraft:recipe_brewing_mix',
    'minecraft:recipe_shaped',
    'minecraft:recipe_shapeless',
    'minecraft:recipe_smithing_transform',
];
/**
 *
 */
var Recipe;
(function (Recipe) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.format_version === "string") {
            const keys = Object.keys(value);
            const type = recipes.filter(name => keys.includes(name))[0];
            if (typeof type !== 'string')
                return false;
            const desc = value[type].description;
            if (typeof desc === "object" && typeof desc.identifier === "string") {
                return true;
            }
        }
        return false;
    }
    Recipe.is = is;
})(Recipe || (exports.Recipe = Recipe = {}));
//# sourceMappingURL=recipe.js.map