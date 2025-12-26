import { Identifiable } from '@blockception/packages-shared';

/**
 *
 */
export interface Model extends Identifiable {
  id: string;
  bones: string[];
}
