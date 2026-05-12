import { IExtensionContext } from '../extension';
export type Context<T> = Readonly<T> & IExtensionContext;
export declare namespace Context {
    /**
     * Creates a new context object to be used
     * @param base The base extension to merge into the context
     * @param additional Any additionals information, might override anything the extension added
     * @param overrides Anything to overrides such as the looger
     * @returns A new context object
     */
    function create<T>(base: IExtensionContext, additional: T, overrides?: Partial<Context<T>>): Context<T>;
    /**
     * Overrides the given context with new information
     * @param base The base context to add
     * @param overlay The object values to addd to the context
     * @returns A new modified context
     */
    function modify<A, B>(base: Context<A>, overlay: B): Context<A & B>;
}
//# sourceMappingURL=context.d.ts.map