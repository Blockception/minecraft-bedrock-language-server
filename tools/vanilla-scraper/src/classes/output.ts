import * as path from 'path';
import { OutputSet } from './output-set';
import { General } from './general';

/**
 * Main output containing vanilla, edu, and general data
 */
export class Output {
  vanilla: OutputSet = new OutputSet();
  edu: OutputSet = new OutputSet();
  general: General = new General();

  /**
   * Load output from a folder
   */
  static load(folder: string): Output {
    const out = new Output();
    out.edu = OutputSet.load(path.join(folder, 'edu'));
    out.vanilla = OutputSet.load(path.join(folder, 'vanilla'));
    return out;
  }

  /**
   * Save output to a folder
   */
  save(folder: string): void {
    this.edu.save(path.join(folder, 'edu'));
    this.vanilla.save(path.join(folder, 'vanilla'));
    this.general.save(path.join(folder, 'general'));
  }

  /**
   * Clean all data
   */
  clean(): void {
    this.edu.clean();
    this.vanilla.clean();
    this.general.clean();
  }

  /**
   * Prune education data from vanilla
   */
  prune(): void {
    // Remove edu entities from vanilla
    for (const entity of this.edu.behaviorPack.entities) {
      this.vanilla.behaviorPack.entities = this.vanilla.behaviorPack.entities.filter((x) => x.id !== entity.id);
      this.vanilla.resourcePack.entities = this.vanilla.resourcePack.entities.filter((x) => x.id !== entity.id);
    }

    // Remove edu blocks from vanilla
    for (const block of this.edu.behaviorPack.blocks) {
      this.vanilla.behaviorPack.blocks = this.vanilla.behaviorPack.blocks.filter((x) => x.id !== block.id);
    }
  }
}
