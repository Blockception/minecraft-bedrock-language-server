import { Block } from '../bp/block';

/**
 * Block property from metadata
 */
export interface BlockProperty {
  name: string;
}

/**
 * Block data from metadata
 */
export interface MetadataBlock {
  name: string;
  properties: BlockProperty[];
  raw_id: number;
  serialization_id: string;
}

/**
 * Convert metadata block to BP block
 */
export function convertMetadataBlock(block: MetadataBlock): Block {
  return {
    id: block.name,
    properties: block.properties.map((p) => p.name),
  };
}
