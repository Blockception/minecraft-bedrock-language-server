/**An object that carries documentation in markdown format*/
export interface Documentated {
  /**The field that stores the documentation*/
  documentation?: string;
}

/**The namespace for the documentated object*/
export namespace Documentated {
  /**Checks if the given object implements Documentated interface
   * @param value The value to examinate
   * @returns*/
  export function is(value: any): value is Documentated {
    if (value && typeof value.documentation === "string") {
      return true;
    }

    return false;
  }

  /**Gets the documentation from either the carrier or creates new on and stores it in the carrier
   * @param data The data carrier.
   * @param create The function that creates a documentation*/
  export function getOrCreate<T extends Documentated>(data: T, create: (data: T) => string): string {
    if (typeof data.documentation === "string") {
      return data.documentation;
    }

    const doc = create(data);
    data.documentation = doc;
    return doc;
  }
}
