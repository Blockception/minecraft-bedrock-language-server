import { Identifiable } from 'bc-minecraft-bedrock-shared';

/**
 *
 */
export interface AnimationController extends Identifiable {
    animations: string[];
    particles: string[];
    sounds: string[];
}
