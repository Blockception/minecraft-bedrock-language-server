import { IIdentifier } from '../interfaces';
/**
 * Sound data from resource packs
 */
export interface Sound extends IIdentifier {
    id: string;
}
/**
 * Create a new Sound
 */
export declare function createSound(): Sound;
/**
 * Convert pack folder to Sound objects
 */
export declare function convertSound(pack: string, receiver: Sound[], soundFiles: string[]): void;
//# sourceMappingURL=sound.d.ts.map