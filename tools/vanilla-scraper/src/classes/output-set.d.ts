import { Container as BPContainer } from '../bp/container';
import { Container as RPContainer } from '../rp/container';
/**
 * Output set containing BP and RP containers
 */
export declare class OutputSet {
    behaviorPack: BPContainer;
    resourcePack: RPContainer;
    /**
     * Load output set from a folder
     */
    static load(folder: string): OutputSet;
    /**
     * Save output set to a folder
     */
    save(folder: string): void;
    /**
     * Clean and deduplicate data
     */
    clean(): void;
}
//# sourceMappingURL=output-set.d.ts.map