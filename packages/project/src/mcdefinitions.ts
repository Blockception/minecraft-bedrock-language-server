import * as fs from "fs";

/**A single definition for MCDefinitions*/
export interface Definition {
  /**The definition that have been defined*/
  defined: string[];

  /**The definition that have to be excluded*/
  excluded: string[];
}

/**The namespace that provides functions for Definitions*/
export namespace Definition {
  /**Add the given value to the definition container, checks if value start with '!' to determine if its exclude or not
   * @param container The container to add to
   * @param value The value to add, if its start with '!' its added to the exclude list*/
  export function add(container: Definition, value: string): void {
    if (value.startsWith("!")) {
      container.excluded.push(value.substring(1, value.length));
    } else {
      container.defined.push(value);
    }
  }

  /**Converts the given container into a text rep for files
   * @param container The container to convert
   * @param key The key each item will be receiving
   * @returns A text rep of the object for files*/
  export function toString(container: Definition, key: string): string {
    let result = "";

    result += `## ${key}\n`;
    for (let I = 0; I < container.defined.length; I++) {
      result += `${key}=${container.defined[I]}\n`;
    }

    for (let I = 0; I < container.excluded.length; I++) {
      result += `${key}=!${container.excluded[I]}\n`;
    }

    result += "\n";

    return result;
  }

  /**Creates an empty version of the interface Definition
   * @returns A empty version of Definition*/
  export function createEmpty(): Definition {
    return {
      excluded: [],
      defined: [],
    };
  }

  /** Checks if the given object implements the definition interface
   * @param value The object to inspect
   * @returns Whether or not the object implements Definition*/
  export function is(value: any): value is Definition {
    if (value) {
      if (value.defined && Array.isArray(value.defined)) {
        if (value.excluded && Array.isArray(value.excluded)) {
          return true;
        }
      }
    }

    return false;
  }
}

/**The interface for MCDefinitions*/
export interface MCDefinition {
  /**A collection of items defined and excluded under a given key*/
  [category: string]: Definition;
}

/**The namespace that provides functions for the MCDefinition interface*/
export namespace MCDefinition {
  /**The default filename of MCdefinitions*/
  export const filename = ".mcdefinitions";

  /**Converts the given contents as if its file contents and returns a MCDefinition object
   * @param content The contents of the given files*/
  export function parse(content: string): MCDefinition {
    const parts = content.split(/(\r\n|\n)/);
    const Out = MCDefinition.createEmpty();

    parts.forEach((property) => {
      //Remove comment
      const cindex = property.indexOf("#");

      if (cindex >= 0) {
        property = property.substring(0, cindex);
      }

      const index = property.indexOf("=");

      if (index >= 0) {
        const name = property.substring(0, index).toLowerCase();
        const value = property.substring(index + 1, property.length);

        const container = getOrAdd(Out, name);
        Definition.add(container, value);
      }
    });

    return Out;
  }

  /**
   *
   * @param data
   * @param category*/
  export function getOrAdd(data: MCDefinition, category: string): Definition {
    let item = data[category];

    if (item === undefined || item === null) {
      item = Definition.createEmpty();
      data[category] = item;
    }

    return item;
  }

  /**Converts the given MCDefinition object into a file content rep of the object
   * @param data The MCDefinition to convert
   * @returns A text rep of the object*/
  export function toString(data: MCDefinition): string {
    let Out = "";

    for (const key in data) {
      const item = data[key];

      if (Definition.is(item)) {
        Out += Definition.toString(item, key);
      }
    }

    return Out;
  }

  /**Creates an empty version of MCDefinition
   * @returns An empty definition of MCDefinition*/
  export function createEmpty(): MCDefinition {
    return {};
  }

  /**Appends the given property and value into the give file
   * @param filepath The path to the MCAttributes
   * @param key The key of the value
   * @param value The value of the porerty
   * @param exclude Whetever or not the exclude the value*/
  export function appendSync(filepath: string, key: string, value: string, exclude: boolean = false): void {
    if (exclude) {
      value = "!" + value;
    }

    fs.appendFileSync(filepath, `${key}=${value}\n`);
  }

  /**Appends the given property and value into the give file
   * @param filepath The path to the MCAttributes
   * @param property The property key
   * @param value The value of the porerty
   * @returns A promise for when the file is appended*/
  export async function append(filepath: string, property: string, value: string): Promise<void> {
    return fs.promises.appendFile(filepath, `${property}=${value}\n`);
  }

  /** Loads the content of the given file into a MCDefinition
   * @param filepath The path to the file to load
   * @returns A filled MCDefinition*/
  export function loadSync(filepath: string): MCDefinition {
    if (fs.existsSync(filepath)) {
      const buffer = fs.readFileSync(filepath);

      return parse(buffer.toString());
    }

    return createEmpty();
  }

  /** Loads the content of the given file into a MCDefinition
   * @param filepath The path to the file to load
   * @returns A filled promise that returns a MCDefinition*/
  export async function load(filepath: string): Promise<MCDefinition> {
    const P = fs.promises.readFile(filepath);

    return P.then((buffer) => parse(buffer.toString()));
  }

  /** Saves the given MCDefinition into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to*/
  export function saveSync(data: MCDefinition, filepath: string): void {
    const content = toString(data);

    fs.writeFileSync(filepath, content);
  }

  /** Saves the given MCDefinition into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   * @returns A promise for when the file will be saved*/
  export async function save(data: MCDefinition, filepath: string): Promise<void> {
    const content = toString(data);

    return fs.promises.writeFile(filepath, content);
  }
}
