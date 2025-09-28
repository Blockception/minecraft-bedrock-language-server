import { SyntaxBuilder } from "./builder";
export declare function processOperators(builder: SyntaxBuilder): void;
export interface Processed {
    _processed: boolean;
}
export declare namespace Processed {
    function withValue<T extends object>(obj: T, value: boolean): void;
    /** */
    function shouldSkip<T extends object>(obj: T): boolean;
}
