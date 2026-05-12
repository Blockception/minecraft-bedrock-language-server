import { Context } from '../../context/context';
import { CompletionContext } from '../context';
type JsonPathMatchFn = (path: string) => boolean;
export interface JsonPathMatch {
    /**
     * Either a string that matches the postfix, a regular expression that matches the path, or a function that returns true if the path matches
     */
    match: string | RegExp | JsonPathMatchFn;
    onCompletion: (context: Context<CompletionContext>) => void;
}
export declare namespace JsonPathMatch {
    /**
     *
     * @param match
     * @param onCompletion
     * @returns
     */
    function create(match: string | RegExp | JsonPathMatchFn, onCompletion: (context: Context<CompletionContext>) => void): {
        match: string | RegExp | JsonPathMatchFn;
        onCompletion: (context: Context<CompletionContext>) => void;
    };
}
export declare class JsonPathCompletion {
    private readonly _items;
    constructor(...items: JsonPathMatch[]);
    /**
     * Performs the onCompletion request, checks all of its item match and performs their events if it matches
     * @param context The context to use and pass on
     */
    onCompletion(context: Context<CompletionContext>): void;
}
export {};
//# sourceMappingURL=json-path.d.ts.map