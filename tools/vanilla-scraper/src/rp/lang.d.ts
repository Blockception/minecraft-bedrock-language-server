import { IIdentifier } from '../interfaces';
/**
 * Lang data from resource packs
 */
export interface Lang extends IIdentifier {
    id: string;
    value: string;
}
/**
 * Create a new Lang
 */
export declare function createLang(): Lang;
/**
 * Convert *.lang file to Lang objects
 */
export declare function convertLang(filepath: string): Lang[];
//# sourceMappingURL=lang.d.ts.map