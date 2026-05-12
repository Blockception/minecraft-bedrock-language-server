import { Identifiable, Documentated, Locatable } from 'bc-minecraft-bedrock-shared';
/** */
export interface BaseObject extends Identifiable, Documentated, Locatable {
}
export declare namespace BaseObject {
    /** */
    function is(value: any): value is BaseObject;
}
//# sourceMappingURL=base-object.d.ts.map