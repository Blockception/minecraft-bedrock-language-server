import { Identifiable } from '../identifiable';

/**
 *
 */
export interface Animation extends Identifiable {
    bones: string[];
    particles: string[];
    sounds: string[];
}
