import { Container as BPContainer } from '../bp/container';
import { GeneralEntity } from './general-entity';
import { Output } from './output';
import { OutputSet } from './output-set';
/**
 * General data (combined from all sources)
 */
export declare class General {
    entityData: GeneralEntity;
    biomes: string[];
    cameraPresets: string[];
    cooldownCategory: string[];
    dimensions: string[];
    effects: string[];
    enchantments: string[];
    potionEffects: string[];
    potionModifiers: string[];
    potionTypes: string[];
    features?: string[];
    /**
     * Load general base data from a folder
     */
    static load(folder: string): General;
    /**
     * Scrape from output
     */
    scrapeFromOutput(output: Output): void;
    /**
     * Scrape from output set
     */
    scrapeFromSet(output: OutputSet): void;
    /**
     * Scrape from BP container
     */
    scrapeFromBP(data: BPContainer): void;
    /**
     * Clean and sort data
     */
    clean(): void;
    /**
     * Save general data to a folder
     */
    save(folder: string): void;
}
//# sourceMappingURL=general.d.ts.map