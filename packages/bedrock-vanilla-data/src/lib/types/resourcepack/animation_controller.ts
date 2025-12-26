import { Identifiable } from '@blockception/packages-shared';

/**
 *
 */
export interface AnimationController extends Identifiable {
    animations: string[];
    particles: string[];
    sounds: string[];
}
