import { IIdentifier } from '../interfaces';
/**
 * Trading data from behavior packs
 */
export interface Trading extends IIdentifier {
    id: string;
}
/**
 * Create a new Trading
 */
export declare function createTrading(id?: string): Trading;
/**
 * Convert file path to Trading object
 */
export declare function convertTrading(filepath: string, receiver: Trading[]): void;
//# sourceMappingURL=trading.d.ts.map