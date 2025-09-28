/**The interface that governs if a object is identifiable*/
export interface Identifiable {
    /**The identifier of this object*/
    id: string;
}
/**
 *
 */
export declare namespace Identifiable {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Identifiable;
    /**
     *
     * @param items
     * @param find
     */
    function find(items: Identifiable[], findID: string | Identifiable): number;
    /**
     *
     * @param items
     * @param find
     */
    function has(items: Identifiable[], findID: string | Identifiable): boolean;
    /**
     *
     * @param items
     * @param find
     */
    function get<T extends Identifiable>(items: T[], findID: string | Identifiable): T | undefined;
}
