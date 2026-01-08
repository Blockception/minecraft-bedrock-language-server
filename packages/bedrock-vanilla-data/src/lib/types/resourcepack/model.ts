import { Identifiable } from 'bc-minecraft-bedrock-shared';

/**
 *
 */
export interface Model extends Identifiable {
  id: string;
  bones: string[];
}
