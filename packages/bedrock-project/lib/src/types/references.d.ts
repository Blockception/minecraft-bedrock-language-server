export type References = Defined & Using;
export interface Defined {
    defined: Set<string>;
}
export interface Using {
    using: Set<string>;
}
export declare namespace References {
    /**
     * Type guard to check if a value is a References object.
     * Returns true if the object has both `using` and `defined` properties as Sets.
     */
    function is(v: any): v is References;
    /**
     * Creates a new empty References object.
     */
    function create(): References;
    /**
     * Wraps existing Sets or Iterables into a References object.
     * If the provided values are not Sets, they are converted into Sets.
     */
    function wrap(using?: Set<string> | Iterable<string>, defined?: Set<string> | Iterable<string>): References;
}
export declare namespace Defined {
    /**
     * Type guard to check if a value is a Defined object.
     * Returns true if the object has a `defined` property that is a Set.
     */
    function is(v: any): v is Defined;
    /**
     * Creates a new empty Defined object.
     */
    function create(): Defined;
    /**
     * Wraps an existing Set or Iterable into a Defined object.
     * If the provided value is not a Set, it is converted into a Set.
     */
    function wrap(data: Set<string> | Iterable<string>): Defined;
    /**
     * Adds items to the `defined` set.
     * Overloaded to optionally accept a transformation function that converts items to strings.
     */
    function add(defined: Defined, data: Iterable<string> | null | undefined): void;
    function add<T>(defined: Defined, data: Iterable<T> | null | undefined, transfn: (item: T) => string): void;
}
export declare namespace Using {
    /**
     * Type guard to check if a value is a Using object.
     * Returns true if the object has a `using` property that is a Set.
     */
    function is(v: any): v is Using;
    /**
     * Creates a new empty Using object.
     */
    function create(): Using;
    /**
     * Wraps an existing Set or Iterable into a Using object.
     * If the provided value is not a Set, it is converted into a Set.
     */
    function wrap(data: Set<string> | Iterable<string>): Using;
    /**
     * Adds items to the `using` set.
     * Overloaded to optionally accept a transformation function that converts items to strings.
     */
    function add(using: Using, data: Iterable<string> | null | undefined): void;
    function add<T>(using: Using, data: Iterable<T> | null | undefined, transfn: (item: T) => string): void;
}
