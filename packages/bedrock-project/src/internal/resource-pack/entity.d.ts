import { FormatVersion } from '../types/format-version';
import { ScriptContainer } from '../types';
import { Definition } from 'bc-minecraft-bedrock-shared';
/** */
export interface Entity extends Readonly<FormatVersion> {
    /** */
    readonly format_version: string;
    /** */
    'minecraft:client_entity': EntityContainer;
}
/** */
export interface EntityContainer {
    /** */
    description: EntityDescription;
}
/** */
export interface EntityDescription extends ScriptContainer {
    /** */
    identifier: string;
    /** */
    materials?: Definition;
    /** */
    animations?: Definition;
    /** */
    animation_controllers?: (string | Definition)[];
    /** */
    particle_effects?: Definition;
    /** */
    geometry?: Definition;
    /** */
    render_controllers?: (string | Definition)[];
    /** */
    sound_effects?: Definition;
    /** */
    textures?: Definition;
}
/** */
export declare namespace Entity {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Entity;
}
//# sourceMappingURL=entity.d.ts.map