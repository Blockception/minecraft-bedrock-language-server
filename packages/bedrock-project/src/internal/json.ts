import { jsonc } from "jsonc";
import { TextDocument } from "../types";

/**The namespace that provided json code*/
export namespace Json {
  /**Takes the given text data and casts into the given object
   * @param doc The document or string to cast
   * @returns Return an object or undefined is something went wrong*/
  export function To<T>(doc: TextDocument | string): T | undefined {
    let out: T | undefined = undefined;
    let file = undefined;

    try {
      let content;

      if (typeof doc === "object") {
        file = doc.uri;
        content = doc.getText();
      } else {
        content = doc;
      }

      if (content !== "") out = <T>jsonc.parse(content);
    } catch (err: any) {
      let message = "";

      if (file) {
        message = `Cannot cast file to json: ${file}\n`;
      }

      if (err.message) {
        message += "message: " + err.message;
      } else {
        message += JSON.stringify(err);
      }

      console.error(message);
    }

    return out;
  }
}
