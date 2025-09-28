import { FormatVersion } from "../types/format-version";
/** */
export interface Particle extends Readonly<FormatVersion> {
    /** */
    format_version: string;
    /** */
    particle_effect: ParticleContainer;
}
/** */
export interface ParticleContainer {
    /** */
    description: ParticleDescription;
    /** */
    components: Record<string, any>;
    events?: Record<string, any>;
    curves?: Record<string, any>;
}
/** */
export interface ParticleDescription {
    /** */
    identifier: string;
}
/**
 *
 */
export declare namespace Particle {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Particle;
}
