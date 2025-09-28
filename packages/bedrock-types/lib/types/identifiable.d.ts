/**The interface that governs if a object is identifiable*/
export interface Identifiable {
    /**The identifier of this object*/
    id: string;
}
/** */
export declare namespace Identifiable {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Identifiable;
    /**TODO add documentation
     *
     * @param items
     * @param id
     * @returns
     */
    function has<T extends Identifiable>(items: T[], id: string): boolean;
    /**TODO add documentation
     *
     * @param items
     * @param id
     * @returns
     */
    function get<T extends Identifiable>(items: T[], id: string): T | undefined;
    /**TODO add documentation
     *
     * @param carrier
     * @returns
     */
    function getId(carrier: string | Identifiable): string;
}
