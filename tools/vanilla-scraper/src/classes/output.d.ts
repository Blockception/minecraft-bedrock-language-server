import { OutputSet } from './output-set';
import { General } from './general';
/**
 * Main output containing vanilla, edu, and general data
 */
export declare class Output {
    vanilla: OutputSet;
    edu: OutputSet;
    general: General;
    /**
     * Load output from a folder
     */
    static load(folder: string): Output;
    /**
     * Save output to a folder
     */
    save(folder: string): void;
    /**
     * Clean all data
     */
    clean(): void;
    /**
     * Prune education data from vanilla
     */
    prune(): void;
}
//# sourceMappingURL=output.d.ts.map