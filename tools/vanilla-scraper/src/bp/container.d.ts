import { Biome } from './biome';
import { Block } from './block';
import { Entity } from './entity';
import { Item } from './item';
import { LootTable } from './loot-table';
import { Trading } from './trading';
/**
 * Container for behavior pack data
 */
export declare class Container {
    blocks: Block[];
    biomes: Biome[];
    features: string[];
    entities: Entity[];
    items: Item[];
    lootTables: LootTable[];
    trading: Trading[];
    /**
     * Load container from a folder
     */
    static load(folder: string): Container;
    /**
     * Save container to a folder
     */
    save(folder: string): void;
    /**
     * Clean and deduplicate data
     */
    clean(): void;
}
//# sourceMappingURL=container.d.ts.map