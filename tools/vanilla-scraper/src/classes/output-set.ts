import * as path from 'path';
import { Container as BPContainer } from '../bp/container';
import { Container as RPContainer } from '../rp/container';

/**
 * Output set containing BP and RP containers
 */
export class OutputSet {
  behaviorPack: BPContainer = new BPContainer();
  resourcePack: RPContainer = new RPContainer();

  /**
   * Load output set from a folder
   */
  static load(folder: string): OutputSet {
    const out = new OutputSet();
    out.behaviorPack = BPContainer.load(path.join(folder, 'behaviorpack'));
    out.resourcePack = RPContainer.load(path.join(folder, 'resourcepack'));
    return out;
  }

  /**
   * Save output set to a folder
   */
  save(folder: string): void {
    this.behaviorPack.save(path.join(folder, 'behaviorpack'));
    this.resourcePack.save(path.join(folder, 'resourcepack'));
  }

  /**
   * Clean and deduplicate data
   */
  clean(): void {
    this.behaviorPack.clean();
    this.resourcePack.clean();
  }
}
