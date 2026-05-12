import { Item } from '../bp/item';
/**
 * Item data from metadata
 */
export interface MetadataItem {
    command_name: string;
    name: string;
    raw_id: number;
    serialization_id: string;
    serialization_name: string;
}
/**
 * Convert metadata item to BP items (multiple for different names)
 */
export declare function convertMetadataItem(item: MetadataItem): Item[];
//# sourceMappingURL=item.d.ts.map