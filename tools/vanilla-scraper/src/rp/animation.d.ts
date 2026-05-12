import { IIdentifier } from '../interfaces';
/**
 * Animation data from resource packs
 */
export interface Animation extends IIdentifier {
    id: string;
    bones: string[];
    particles: string[];
    sounds: string[];
}
/**
 * Create a new Animation
 */
export declare function createAnimation(): Animation;
/**
 * Convert JSON document to Animation objects
 */
export declare function convertAnimation(doc: object, receiver: Animation[]): void;
//# sourceMappingURL=animation.d.ts.map