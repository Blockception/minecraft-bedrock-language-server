//Note: this is kept sync with vscode form of textdocument for easy of use

import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../internal/json";

/** */
export interface TextDocument {
  /** */
  readonly uri: string;

  /**
   *
   * @param range
   */
  getText(range?: Types.Range): string;
}

export namespace TextDocument {
  /**
   * Reads the text document and returns the json object, but only if its matches the checkIs fn
   * @param doc The document to read
   * @param checkIs The function to check if the json object is of the correct type
   * @returns The json object or undefined
   */
  export function toObject<T>(doc: TextDocument, checkIs?: (value: any) => value is T): T | undefined {
    const imp = Json.To<T>(doc);

    if (checkIs) {
      if (checkIs(imp)) {
        return imp;
      } else {
        return undefined;
      }
    }

    return imp;
  }
}

export namespace TestTextDocument {
  export function create(uri: string, content: string): TextDocument {
    return {
      uri,
      getText: () => content,
    };
  }
}
