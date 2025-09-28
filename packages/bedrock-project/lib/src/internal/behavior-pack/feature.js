"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
const features = [
    'minecraft:weighted_random_feature',
    'minecraft:aggregate_feature',
    'minecraft:cave_carver_feature',
    'minecraft:fossil_feature',
    'minecraft:geode_feature',
    'minecraft:growing_plant_feature',
    'minecraft:multiface_feature',
    'minecraft:nether_cave_carver_feature',
    'minecraft:ore_feature',
    'minecraft:partially_exposed_blob_feature',
    'minecraft:scatter_feature',
    'minecraft:search_feature',
    'minecraft:sequence_feature',
    'minecraft:single_block_feature',
    'minecraft:snap_to_surface_feature',
    'minecraft:structure_template_feature',
    'minecraft:surface_relative_threshold_feature',
    'minecraft:tree_feature',
    'minecraft:underwater_cave_carver_feature',
    'minecraft:vegetation_patch_feature'
];
/** */
var Feature;
(function (Feature) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.format_version === "string" && typeof value === 'object') {
            const keys = Object.keys(value);
            const type = features.filter(feature => keys.includes(feature))[0];
            if (type && typeof value[type].description === 'object' && typeof value[type].description.identifier === 'string')
                return true;
        }
        return false;
    }
    Feature.is = is;
})(Feature || (exports.Feature = Feature = {}));
//# sourceMappingURL=feature.js.map