import { Context } from '../classes/context';
export declare const workFolder: string;
export declare const workspaceFolder: string;
export declare const libraryFolder: string;
export declare const outputFolder: string;
export declare const outputEdu: string;
export declare const outputVanilla: string;
export declare const baseFolder: string;
export declare const baseEdu: string;
export declare const baseVanilla: string;
/**
 * Download file from URL
 */
export declare function download(filepath: string, uri: string): Promise<void>;
/**
 * Download and unpack a zip file
 */
export declare function downloadUnpack(name: string, uri: string): Promise<string | null>;
/**
 * Get folders for scraping
 */
export declare function getFolders(): Promise<Context>;
//# sourceMappingURL=utility.d.ts.map