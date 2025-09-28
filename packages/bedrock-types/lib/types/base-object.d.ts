import { Documentated } from './documentated';
import { Identifiable } from './identifiable';
import { Locatable } from './locatable';
/** */
export interface BaseObject extends Identifiable, Documentated, Locatable {
}
export declare namespace BaseObject {
    /** */
    function is(value: any): value is BaseObject;
}
