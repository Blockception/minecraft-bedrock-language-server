import { Identifiable } from '@blockception/packages-shared';

/**
 *
 */
export interface Animation extends Identifiable {
    bones: string[];
    particles: string[];
    sounds: string[];
}
