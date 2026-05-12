import { IIdentifier } from '../interfaces';
/**
 * Render controller data from resource packs
 */
export interface RenderController extends IIdentifier {
    id: string;
}
/**
 * Create a new RenderController
 */
export declare function createRenderController(): RenderController;
/**
 * Convert JSON document to RenderController objects
 */
export declare function convertRenderController(doc: object, receiver: RenderController[]): void;
//# sourceMappingURL=render-controller.d.ts.map