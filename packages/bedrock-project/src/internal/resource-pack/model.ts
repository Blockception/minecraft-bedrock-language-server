import { FormatVersion } from "../types/format-version";

/** */
export type Model = ModelLegacy | ModelModern;

/** */
export namespace Model {
  export function is(value: any): value is Model {
    if (ModelModern.is(value) || ModelLegacy.is(value)) return true;

    return false;
  }
}

/** */
export type ModelLegacy = FormatVersion & Record<string, ModelLegacySpec>;

/** */
export namespace ModelLegacy {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is ModelLegacy {
    if (typeof value === "object" && (value.format_version === "1.8.0" || value.format_version === "1.10.0")) {
      return true;
    }

    return false;
  }
}

/** */
export interface ModelLegacySpec {
  /** */
  bones: Bone[];
}

export namespace ModelLegacySpec {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is ModelLegacySpec {
    if (typeof value === "object" && Array.isArray(value.bones)) {
      return true;
    }

    return false;
  }
}

/** */
export interface ModelModern extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  "minecraft:geometry": ModelModernSpec[];
}

/** */
export namespace ModelModern {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is ModelModern {
    if (typeof value === "object" && typeof value.format_version === "string" && Array.isArray(value["minecraft:geometry"])) {
      return true;
    }

    return false;
  }
}

/** */
export interface ModelModernSpec {
  /** */
  description: {
    /** */
    identifier: string;
  };

  bones: Bone[];
}

/** */
export namespace ModelModernSpec {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is ModelModernSpec {
    if (typeof value === "object" && typeof value.description === "object") {
      if (typeof value.description.identifier === "string") return true;
    }

    return false;
  }
}

export interface Bone {
  /** */
  name: string;
  /** */
  parent: string;
  /** */
  binding?: string;
  /** */
  locators?: Record<string, [number, number, number]>
}