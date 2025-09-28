import { Identifiable } from '../Identifiable';

/**
 *
 */
export interface AnimationController extends Identifiable {
    animations: string[];
    particles: string[];
    sounds: string[];
}
