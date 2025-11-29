import * as path from 'path';
import { Container as BPContainer } from '../bp/container';
import { stringSort } from '../static/sort';

/**
 * General entity data (combined from all entities)
 */
export class GeneralEntity {
  families: string[] = [];
  events: string[] = [];

  /**
   * Scrape entity data from BP container
   */
  scrape(data: BPContainer): void {
    for (const entity of data.entities) {
      for (const event of entity.events) {
        if (!this.events.includes(event)) {
          this.events.push(event);
        }
      }

      for (const family of entity.families) {
        if (!this.families.includes(family)) {
          this.families.push(family);
        }
      }
    }
  }

  /**
   * Clean and sort data
   */
  clean(): void {
    this.events.sort(stringSort);
    this.families.sort(stringSort);
  }
}
