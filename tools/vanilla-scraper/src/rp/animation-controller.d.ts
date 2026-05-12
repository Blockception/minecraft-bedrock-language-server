import { IIdentifier } from '../interfaces';
/**
 * Animation controller data from resource packs
 */
export interface AnimationController extends IIdentifier {
    id: string;
    animations: string[];
    particles: string[];
    sounds: string[];
}
/**
 * Create a new AnimationController
 */
export declare function createAnimationController(): AnimationController;
/**
 * Convert JSON document to AnimationController objects
 */
export declare function convertAnimationController(doc: object, receiver: AnimationController[]): void;
//# sourceMappingURL=animation-controller.d.ts.map