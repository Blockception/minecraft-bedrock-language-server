import { Json as SharedJson, TextDocument } from 'bc-minecraft-bedrock-shared';

/**The namespace that provided json code*/
export namespace Json {
  /**Takes the given text data and casts into the given object
   * @param doc The document or string to cast
   * @returns Return an object or undefined is something went wrong*/
  export function To<T>(doc: TextDocument | string): T | undefined {
    return SharedJson.To<T>(doc);
  }
}
