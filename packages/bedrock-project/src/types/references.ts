// A References type is simply the combination of Defined and Using interfaces.
// It represents a set of "defined" items and a set of "used" items.
export type References = Defined & Using;

// Interface representing a collection of "defined" items (strings).
export interface Defined {
  defined: Set<string>;
}

// Interface representing a collection of "used" items (strings).
export interface Using {
  using: Set<string>;
}

// Namespace for functions that operate on the References type.
export namespace References {
  /**
   * Type guard to check if a value is a References object.
   * Returns true if the object has both `using` and `defined` properties as Sets.
   */
  export function is(v: any): v is References {
    return v?.using instanceof Set && v?.defined instanceof Set;
  }

  /**
   * Creates a new empty References object.
   */
  export function create(): References {
    return { defined: new Set(), using: new Set() };
  }

  /**
   * Wraps existing Sets or Iterables into a References object.
   * If the provided values are not Sets, they are converted into Sets.
   */
  export function wrap(using?: Set<string> | Iterable<string>, defined?: Set<string> | Iterable<string>): References {
    return {
      using: using instanceof Set ? using : new Set(using),
      defined: defined instanceof Set ? defined : new Set(defined),
    };
  }
}

// Namespace for functions that operate on the Defined type.
export namespace Defined {
  /**
   * Type guard to check if a value is a Defined object.
   * Returns true if the object has a `defined` property that is a Set.
   */
  export function is(v: any): v is Defined {
    return v?.defined instanceof Set;
  }

  /**
   * Creates a new empty Defined object.
   */
  export function create(): Defined {
    return { defined: new Set() };
  }

  /**
   * Wraps an existing Set or Iterable into a Defined object.
   * If the provided value is not a Set, it is converted into a Set.
   */
  export function wrap(data: Set<string> | Iterable<string>): Defined {
    return { defined: data instanceof Set ? data : new Set(data) };
  }

  /**
   * Adds items to the `defined` set.
   * Overloaded to optionally accept a transformation function that converts items to strings.
   */
  export function add(defined: Defined, data: Iterable<string> | null | undefined): void;
  export function add<T>(defined: Defined, data: Iterable<T> | null | undefined, transfn: (item: T) => string): void;

  export function add<T>(defined: Defined, data: Iterable<T> | null | undefined, transfn?: (item: T) => string): void {
    if (!data) return; // No data to add
    if (transfn) {
      // If a transformation function is provided, apply it before adding
      for (const item of data) {
        defined.defined.add(transfn(item));
      }
    } else {
      // Otherwise, assume the items are already strings
      for (const item of data) {
        defined.defined.add(item as string);
      }
    }
  }
}

// Namespace for functions that operate on the Using type.
export namespace Using {
  /**
   * Type guard to check if a value is a Using object.
   * Returns true if the object has a `using` property that is a Set.
   */
  export function is(v: any): v is Using {
    return v?.using instanceof Set;
  }

  /**
   * Creates a new empty Using object.
   */
  export function create(): Using {
    return { using: new Set() };
  }

  /**
   * Wraps an existing Set or Iterable into a Using object.
   * If the provided value is not a Set, it is converted into a Set.
   */
  export function wrap(data: Set<string> | Iterable<string>): Using {
    return { using: data instanceof Set ? data : new Set(data) };
  }

  /**
   * Adds items to the `using` set.
   * Overloaded to optionally accept a transformation function that converts items to strings.
   */
  export function add(using: Using, data: Iterable<string> | null | undefined): void;
  export function add<T>(using: Using, data: Iterable<T> | null | undefined, transfn: (item: T) => string): void;

  export function add<T>(using: Using, data: Iterable<T> | null | undefined, transfn?: (item: T) => string): void {
    if (!data) return; // No data to add
    if (transfn) {
      // If a transformation function is provided, apply it before adding
      for (const item of data) {
        using.using.add(transfn(item));
      }
    } else {
      // Otherwise, assume the items are already strings
      for (const item of data) {
        using.using.add(item as string);
      }
    }
  }
}
