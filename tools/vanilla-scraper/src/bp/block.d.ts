import { IIdentifier } from '../interfaces';
/**
 * Block state data
 */
export interface BlockState {
    values: string[];
    name: string;
    type: string;
}
/**
 * Block data from behavior packs
 */
export interface Block extends IIdentifier {
    id: string;
    properties: string[];
}
/**
 * Create a new Block
 */
export declare function createBlock(): Block;
/**
 * Create a new BlockState
 */
export declare function createBlockState(): BlockState;
/**
 * Convert JSON document to Block objects
 */
export declare function convertBlock(doc: object, receiver: Block[]): void;
//# sourceMappingURL=block.d.ts.map