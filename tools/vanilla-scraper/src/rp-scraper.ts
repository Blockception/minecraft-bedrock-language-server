import * as path from 'path';
import * as fs from 'fs';
import { findJsonFiles, readJsonFile } from './utils.js';
import {
  Animation,
  AnimationController,
  Entity,
  Fog,
  Model,
  Particle,
  RenderController,
  Material,
  Sound,
  Texture,
  TextureAtlas,
  ResourcePackContainer,
} from './types.js';

/**
 * Scrape resource pack data
 */
export function scrapeResourcePack(sources: string[], container: ResourcePackContainer): void {
  for (const source of sources) {
    scrapeResourcePackFolder(source, container);
  }
}

function scrapeResourcePackFolder(source: string, container: ResourcePackContainer): void {
  console.log('Scraping RP: ' + source);

  scrapeAnimationControllersFromFolder(
    container.animationControllers,
    path.join(source, 'animation_controllers')
  );
  scrapeAnimationsFromFolder(container.animations, path.join(source, 'animations'));
  scrapeRPEntitiesFromFolder(container.entities, path.join(source, 'entity'));
  scrapeFogsFromFolder(container.fogs, path.join(source, 'fogs'));
  scrapeModelsFromFolder(container.models, path.join(source, 'models'));
  scrapeParticlesFromFolder(container.particles, path.join(source, 'particles'));
  scrapeRenderControllersFromFolder(
    container.renderControllers,
    path.join(source, 'render_controllers')
  );

  scrapeMaterials(source, container.materials);
  scrapeSounds(source, container.sounds, container.soundFiles);
  scrapeTextures(source, container.textures);

  scrapeTextureAtlas(path.join(source, 'textures', 'item_texture.json'), container.textureItems);
  scrapeTextureAtlas(path.join(source, 'textures', 'terrain_texture.json'), container.textureTerrain);
}

function scrapeAnimationControllersFromFolder(receiver: AnimationController[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const controllers = data.animation_controllers;
      if (!controllers) continue;

      for (const id of Object.keys(controllers)) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeAnimationsFromFolder(receiver: Animation[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const animations = data.animations;
      if (!animations) continue;

      for (const id of Object.keys(animations)) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeRPEntitiesFromFolder(receiver: Entity[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const entityDef = data['minecraft:client_entity'];
      if (!entityDef) continue;

      const desc = entityDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (id) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeFogsFromFolder(receiver: Fog[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const fogDef = data['minecraft:fog_settings'];
      if (!fogDef) continue;

      const desc = fogDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (id) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeModelsFromFolder(receiver: Model[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      // Models typically have format_version and identifier
      if (data['minecraft:geometry']) {
        const geometries = data['minecraft:geometry'];
        if (Array.isArray(geometries)) {
          for (const geo of geometries) {
            const desc = geo.description;
            if (desc && desc.identifier) {
              receiver.push({ id: desc.identifier });
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeParticlesFromFolder(receiver: Particle[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const particleDef = data.particle_effect;
      if (!particleDef) continue;

      const desc = particleDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (id) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeRenderControllersFromFolder(receiver: RenderController[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const controllers = data.render_controllers;
      if (!controllers) continue;

      for (const id of Object.keys(controllers)) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeMaterials(pack: string, receiver: Material[]): void {
  const filepath = path.join(pack, 'materials', 'entity.material');
  
  if (!fs.existsSync(filepath)) return;

  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(content);

    if (data.materials) {
      for (const id of Object.keys(data.materials)) {
        receiver.push({ id });
      }
    }
  } catch (error) {
    console.error(`Error processing ${filepath}:`, error);
  }
}

function scrapeSounds(pack: string, receiver: Sound[], soundFiles: string[]): void {
  const filepath = path.join(pack, 'sounds', 'sound_definitions.json');
  const data = readJsonFile<any>(filepath);

  if (!data) return;

  const definitions = data.sound_definitions;
  if (!definitions) return;

  for (const [id, def] of Object.entries(definitions)) {
    receiver.push({ id });

    // Extract sound file references
    const soundDef = def as any;
    if (soundDef.sounds && Array.isArray(soundDef.sounds)) {
      for (const sound of soundDef.sounds) {
        if (typeof sound === 'string') {
          soundFiles.push(sound);
        } else if (sound && typeof sound === 'object' && sound.name) {
          soundFiles.push(sound.name);
        }
      }
    }
  }
}

function scrapeTextures(pack: string, receiver: Texture[]): void {
  const texturesFolder = path.join(pack, 'textures');
  
  if (!fs.existsSync(texturesFolder)) return;

  // Find all texture files (png, tga, etc.)
  const findTextures = (dir: string) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);
      
      if (stat.isDirectory()) {
        findTextures(filepath);
      } else if (file.match(/\.(png|tga|jpg|jpeg)$/i)) {
        const relativePath = path.relative(texturesFolder, filepath);
        const id = relativePath.replace(/\\/g, '/').replace(/\.[^.]+$/, '');
        receiver.push({ id });
      }
    }
  };

  findTextures(texturesFolder);
}

function scrapeTextureAtlas(filepath: string, receiver: TextureAtlas[]): void {
  const data = readJsonFile<any>(filepath);
  if (!data) return;

  const textureData = data.texture_data;
  if (!textureData) return;

  for (const [id, texDef] of Object.entries(textureData)) {
    const atlas: TextureAtlas = { id };
    
    const def = texDef as any;
    if (def.textures) {
      if (typeof def.textures === 'string') {
        atlas.texture = def.textures;
      } else if (Array.isArray(def.textures) && def.textures.length > 0) {
        atlas.texture = def.textures[0];
      }
    }
    
    receiver.push(atlas);
  }
}
