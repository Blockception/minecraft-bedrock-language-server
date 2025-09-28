/** */
export type JsonPath = string;

/** */
export namespace JsonPath {
  export const seperator = "/";

  /**TODO add documentation
   *
   * @param text
   * @param path
   */
  export function resolve(text: string | { getText(): string }, path: JsonPath): number {
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

  /**TODO add documentation
   *
   * @param path
   * @returns
   */
  export function create(...path: string[]): JsonPath {
    return path.join(JsonPath.seperator);
  }

  /**TODO add documentation
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is JsonPath {
    return typeof value === "string";
  }
}
