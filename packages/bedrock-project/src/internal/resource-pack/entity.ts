
import { FormatVersion } from '../types/format-version';
import { ScriptContainer } from '../types';
import { Definition } from '@blockception/packages-shared';

/** */
export interface Entity extends Readonly<FormatVersion> {
  /** */
  readonly format_version: string;
  /** */
  'minecraft:client_entity': EntityContainer;
}

/** */
export interface EntityContainer {
  /** */
  description: EntityDescription;
}

/** */
export interface EntityDescription extends ScriptContainer {
  /** */
  identifier: string;
  /** */
  materials?: Definition;
  /** */
  animations?: Definition;
  /** */
  animation_controllers?: (string | Definition)[];
  /** */
  particle_effects?: Definition;
  /** */
  geometry?: Definition;
  /** */
  render_controllers?: (string | Definition)[];
  /** */
  sound_effects?: Definition;
  /** */
  textures?: Definition;
}

/** */
export namespace Entity {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Entity {
    const temp = <Entity>value;
    if (
      typeof temp === 'object' &&
      typeof temp.format_version === 'string' &&
      typeof temp['minecraft:client_entity'] === 'object'
    ) {
      const desc = temp['minecraft:client_entity'].description;

      if (typeof desc === 'object' && typeof desc.identifier === 'string') return true;
    }

    return false;
  }
}
