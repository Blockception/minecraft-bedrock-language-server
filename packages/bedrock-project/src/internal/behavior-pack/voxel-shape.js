"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelShape = void 0;
/**
 * Utility functions for VoxelShape validation.
 */
var VoxelShape;
(function (VoxelShape) {
    /**
     * Type guard to check if a value is of type VoxelShape.
     * @param value The value to check
     * @returns True if the value is a valid VoxelShape object
     */
    function is(value) {
        if (typeof value === 'object' &&
            typeof value.format_version === 'string' &&
            typeof value['minecraft:voxel_shape'] === 'object') {
            const desc = value['minecraft:voxel_shape'].description;
            if (typeof desc === 'object' && typeof desc.identifier === 'string') {
                return true;
            }
        }
        return false;
    }
    VoxelShape.is = is;
})(VoxelShape || (exports.VoxelShape = VoxelShape = {}));
//# sourceMappingURL=voxel-shape.js.map