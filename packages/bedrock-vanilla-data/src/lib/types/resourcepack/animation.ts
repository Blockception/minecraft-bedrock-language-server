import { Identifiable } from 'bc-minecraft-bedrock-shared';

/**
 *
 */
export interface Animation extends Identifiable {
    bones: string[];
    particles: string[];
    sounds: string[];
}
