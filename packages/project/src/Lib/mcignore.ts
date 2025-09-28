import * as fs from "fs";

/**The interface that collects ignore patterns*/
export interface MCIgnore {
  /**The glob patterns that are used to ignore*/
  patterns: string[];
}

/**The namespace that provides functions for MCIgnore interfaces*/
export namespace MCIgnore {
  /**The default filename of a MCIgnore filename*/
  export const filename = ".mcignore";

  /**Creates an empty version of MCIgnore
   * @returns An empty MCIgnore object*/
  export function createEmpty(): MCIgnore {
    return { patterns: [] };
  }

  /** Merges the two given objects into a new MCIgnore.
   * @param A The first data set
   * @param B The second data set
   * @returns A new object with the combined patterns*/
  export function merge(A: MCIgnore | undefined, B: MCIgnore | undefined): MCIgnore {
    const result = MCIgnore.createEmpty();

    if (A) result.patterns.push(...A.patterns);
    if (B) result.patterns.push(...B.patterns);

    return result;
  }

  /** Checks wheter or not the given object implements MCIgnore
   * @param value The object to test*/
  export function is(value: any): value is MCIgnore {
    if (value) {
      if (value.patterns && Array.isArray(value.patterns)) return true;
    }

    return false;
  }

  /**Parses the given content as if its file content, whereby each line is an pattern
   * @param content The content that one would get as in a file
   * @returns A parsed version based on the contents, or an empty object*/
  export function parse(content: string): MCIgnore {
    return {
      patterns: content
        .split(/(\r\n|\n)/)
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
  }

  /**Converts the given MCIgnore to file content
   * @param data The MCIgnore data to convert
   * @returns A string represerntation of the contents of a MCIgnore*/
  export function toString(data: MCIgnore): string {
    return data.patterns.join("\n");
  }

  /** Loads the content of the given file into a MCIgnore
   * @param filepath The path to the file to load
   * @returns A filled MCIgnore*/
  export function loadSync(filepath: string): MCIgnore {
    if (fs.existsSync(filepath)) {
      const buffer = fs.readFileSync(filepath);

      return parse(buffer.toString());
    }

    return createEmpty();
  }

  /** Loads the content of the given file into a MCIgnore
   * @param filepath The path to the file to load
   * @returns A filled promise that returns a MCIgnore*/
  export async function load(filepath: string): Promise<MCIgnore> {
    return fs.promises.readFile(filepath).then((buffer) => parse(buffer.toString()));
  }

  /** Saves the given MCIgnore into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to*/
  export function saveSync(data: MCIgnore, filepath: string): void {
    const content = toString(data);

    fs.writeFileSync(filepath, content);
  }

  /** Saves the given MCIgnore into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   * @returns A promise for when the file will be saved*/
  export async function save(data: MCIgnore, filepath: string): Promise<void> {
    const content = toString(data);

    return fs.promises.writeFile(filepath, content);
  }
}
