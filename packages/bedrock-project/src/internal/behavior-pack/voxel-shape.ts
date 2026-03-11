import { FormatVersion } from '../types/format-version';

/**
 * Internal representation of a voxel shape file structure.
 * Voxel shapes are stored in the `shapes/` folder of a behavior pack.
 */
export interface VoxelShape extends Readonly<FormatVersion> {
  /**The format version of the voxel shape file*/
  format_version: string;
  /**The voxel shape data container*/
  'minecraft:voxel_shape': {
    description: {
      identifier: string;
    };
  };
}

/**
 * Utility functions for VoxelShape validation.
 */
export namespace VoxelShape {
  /**
   * Type guard to check if a value is of type VoxelShape.
   * @param value The value to check
   * @returns True if the value is a valid VoxelShape object
   */
  export function is(value: any): value is VoxelShape {
    if (
      typeof value === 'object' &&
      typeof value.format_version === 'string' &&
      typeof value['minecraft:voxel_shape'] === 'object'
    ) {
      const desc = value['minecraft:voxel_shape'].description;

      if (typeof desc === 'object' && typeof desc.identifier === 'string') {
        return true;
      }
    }

    return false;
  }
}
