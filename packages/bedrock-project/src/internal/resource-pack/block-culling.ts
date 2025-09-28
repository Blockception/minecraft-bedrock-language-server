import { FormatVersion } from "../types/format-version";

/**
 * Represents the interface for Block Culling.
 *
 * Block culling is a technique used in computer graphics to optimize rendering performance by not rendering faces of blocks that are not visible to the player.
 * This interface defines the contract for implementing block culling logic in a resource pack for a Minecraft Bedrock Edition project.
 */
export interface BlockCulling extends Readonly<FormatVersion> {
  /**
   * The block culling rules for the resource pack.
   */
  "minecraft:block_culling_rules": BlockCullingSpec;
}

/**
 * Namespace for Block Culling functionality.
 */
export namespace BlockCulling {
  /**
   * Type guard function to check if a value is of type BlockCulling.
   * @param value - The value to check.
   * @returns True if the value is of type BlockCulling, false otherwise.
   */
  export function is(value: any): value is BlockCulling {
    if (typeof value === "object") {
      const rules = value["minecraft:block_culling_rules"];
      if (typeof rules === "object") {
        return true;
      }
    }

    return false;
  }
}

/**
 * Represents the block culling specification.
 */
export interface BlockCullingSpec {
  /**
   * The description of the block culling specification.
   */
  description: BlockCullingDescription;

  /**
   * The rules for block culling.
   */
  rules: BlockCullingRule[];
}

/**
 * Represents a block culling rule.
 */
export interface BlockCullingDescription {
  /**
   * The identifier of the block culling specification.
   */
  identifier: string;
}

/**
 * Represents a block culling rule.
 */
export interface BlockCullingRule {
  /**
   * The direction of the block culling rule.
   */
  direction: string;

  /**
   * The geometry part of the block culling rule.
   */
  geometry_part: GeometryPart;
}

/**
 * Represents a geometry part of a block culling rule.
 */
export interface GeometryPart {
  /**
   * The bone of the geometry part.
   */
  bone?: string;

  /**
   * The cube of the geometry part.
   */
  cube?: number;

  /**
   * The face of the geometry part.
   */
  face?: string;
}
