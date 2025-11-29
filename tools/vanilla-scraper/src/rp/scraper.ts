import * as path from 'path';
import { Container } from './container';
import { convertAnimation } from './animation';
import { convertAnimationController } from './animation-controller';
import { convertEntity } from './entity';
import { convertFog } from './fog';
import { convertMaterial } from './material';
import { convertModel } from './model';
import { convertParticle } from './particle';
import { convertRenderController } from './render-controller';
import { convertSound } from './sound';
import { convertTexture } from './texture';
import { convertTextureAtlas } from './texture-atlas';
import { fromFolderJson } from '../static/convert';

/**
 * Scrape resource pack data from multiple sources
 */
export function scrape(sources: string[], container: Container): void {
  for (const source of sources) {
    scrapeSource(source, container);
  }
}

/**
 * Scrape resource pack data from a single source
 */
export function scrapeSource(source: string, container: Container): void {
  console.log('Scraping RP: ' + source);

  fromFolderJson(convertAnimationController, container.animationControllers, path.join(source, 'animation_controllers'));
  fromFolderJson(convertAnimation, container.animations, path.join(source, 'animations'));
  fromFolderJson(convertEntity, container.entities, path.join(source, 'entity'));
  fromFolderJson(convertFog, container.fogs, path.join(source, 'fogs'));
  fromFolderJson(convertModel, container.models, path.join(source, 'models'));
  fromFolderJson(convertParticle, container.particles, path.join(source, 'particles'));
  fromFolderJson(convertRenderController, container.renderControllers, path.join(source, 'render_controllers'));

  convertMaterial(source, container.materials);
  convertSound(source, container.sounds, container.soundFiles);
  convertTexture(source, container.textures);

  convertTextureAtlas(path.join(source, 'textures', 'item_texture.json'), container.textureItems);
  convertTextureAtlas(path.join(source, 'textures', 'terrain_texture.json'), container.textureTerrain);
}
