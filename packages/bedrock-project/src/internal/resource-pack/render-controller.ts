import { FormatVersion } from "../types/format-version";

export interface RenderControllers extends Readonly<FormatVersion> {
  format_version: string;

  render_controllers: {
    [controller: string]: RenderController;
  };
}

export namespace RenderControllers {
  export function is(value: any): value is RenderControllers {
    if (typeof value === "object") {
      if (typeof value.format_version === "string" && typeof value.render_controllers === "object") {
        return true;
      }
    }

    return false;
  }
}

/**
 * Represents a render controller.
 */
export interface RenderController {
  /**
   * Arrays used for rendering.
   */
  arrays?: {
    /**
     * Array specification for materials.
     */
    materials?: ArraySpec;

    /**
     * Array specification for geometries.
     */
    geometries?: ArraySpec;

    /**
     * Array specification for textures.
     */
    textures?: ArraySpec;
  };

  /**
   * The geometry used for rendering.
   */
  geometry?: string;

  /**
   * The materials used for rendering.
   */
  materials?: MaterialSpec[];

  /**
   * The textures used for rendering.
   */
  textures?: string[];

  /**
   * The visibility of different parts.
   */
  part_visibility: Record<string, boolean | string>[];
}

export interface MaterialSpec {
  [materialPattern: string]: string;
}

export interface ArraySpec {
  [arrayID: string]: string[];
}
