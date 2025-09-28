import { TextDocument } from "./text-document";

/** */
export type JsonPath = string;

/** */
export namespace JsonPath {
  export const seperator = "/";

  /**
   *
   * @param text
   * @param path
   */
  export function resolve(text: string | TextDocument, path: JsonPath): number {
    if (typeof text === "object") text = text.getText();

    const s = path.split(/[\\/]/);
    let index = 0;

    for (let I = 0; I < s.length; I++) {
      const elem = s[I];

      if (!Number.isInteger(elem) && elem !== "") {
        const t = text.indexOf(elem, index);
        if (t > -1) index = t;
      }
    }

    return index;
  }

  /**
   *
   * @param path
   * @returns
   */
  export function create(...path: string[]): JsonPath {
    return path.join(JsonPath.seperator);
  }

  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is JsonPath {
    return typeof value === "string";
  }
}
