/**An object that carries documentation in markdown format*/
export interface Documentated {
    /**The field that stores the documentation*/
    documentation?: string;
}
/**The namespace for the documentated object*/
export declare namespace Documentated {
    /**Checks if the given object implements Documentated interface
     * @param value The value to examinate
     * @returns*/
    function is(value: any): value is Documentated;
    /**Gets the documentation from either the carrier or creates new on and stores it in the carrier
     * @param data The data carrier.
     * @param create The function that creates a documentation*/
    function getOrCreate<T extends Documentated>(data: T, create: (data: T) => string): string;
}
