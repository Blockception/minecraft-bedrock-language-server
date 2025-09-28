import { Identifiable } from '../Identifiable';

/**
 *
 */
export interface Animation extends Identifiable {
    bones: string[];
    particles: string[];
    sounds: string[];
}
