import { Identifiable } from '../identifiable';

/**
 *
 */
export interface AnimationController extends Identifiable {
    animations: string[];
    particles: string[];
    sounds: string[];
}
