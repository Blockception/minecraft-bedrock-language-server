import { Container as BPContainer } from '../bp/container';
/**
 * General entity data (combined from all entities)
 */
export declare class GeneralEntity {
    families: string[];
    events: string[];
    /**
     * Scrape entity data from BP container
     */
    scrape(data: BPContainer): void;
    /**
     * Clean and sort data
     */
    clean(): void;
}
//# sourceMappingURL=general-entity.d.ts.map