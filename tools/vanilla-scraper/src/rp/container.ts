import * as fs from 'fs';
import * as path from 'path';
import { cleanIdentifiers } from '../static/identifier-extension';
import { loadEnsure } from '../static/json';
import { ensureProperties } from '../static/sanitize';
import { saveArray } from '../static/typescript';
import { Animation, createAnimation } from './animation';
import { AnimationController, createAnimationController } from './animation-controller';
import { createEntity, Entity } from './entity';
import { createFog, Fog } from './fog';
import { createMaterial, Material } from './material';
import { createModel, Model } from './model';
import { createParticle, Particle } from './particle';
import { createRenderController, RenderController } from './render-controller';
import { createSound, Sound } from './sound';
import { createTexture, Texture } from './texture';
import { createTextureAtlas, TextureAtlas } from './texture-atlas';

/**
 * Container for resource pack data
 */
export class Container {
  animationControllers: AnimationController[] = [];
  animations: Animation[] = [];
  entities: Entity[] = [];
  fogs: Fog[] = [];
  materials: Material[] = [];
  models: Model[] = [];
  particles: Particle[] = [];
  renderControllers: RenderController[] = [];
  sounds: Sound[] = [];
  textures: Texture[] = [];
  textureItems: TextureAtlas[] = [];
  textureTerrain: TextureAtlas[] = [];
  soundFiles: string[] = [];

  /**
   * Load container from a folder
   */
  static load(folder: string): Container {
    const out = new Container();
    out.animationControllers = loadEnsure<AnimationController>(path.join(folder, 'animation_controllers.json'));
    out.animations = loadEnsure<Animation>(path.join(folder, 'animations.json'));
    out.entities = loadEnsure<Entity>(path.join(folder, 'entities.json'));
    out.fogs = loadEnsure<Fog>(path.join(folder, 'fogs.json'));
    out.materials = loadEnsure<Material>(path.join(folder, 'materials.json'));
    out.models = loadEnsure<Model>(path.join(folder, 'models.json'));
    out.particles = loadEnsure<Particle>(path.join(folder, 'particles.json'));
    out.renderControllers = loadEnsure<RenderController>(path.join(folder, 'render_controllers.json'));
    out.sounds = loadEnsure<Sound>(path.join(folder, 'sounds.json'));
    out.textureItems = loadEnsure<TextureAtlas>(path.join(folder, 'texture-atlas-item.json'));
    out.textures = loadEnsure<Texture>(path.join(folder, 'textures.json'));
    out.textureTerrain = loadEnsure<TextureAtlas>(path.join(folder, 'texture-atlas-terrain.json'));
    return out;
  }

  /**
   * Save container to a folder
   */
  save(folder: string): void {
    fs.mkdirSync(folder, { recursive: true });

    saveArray(
      'Animation',
      '../../types/resourcepack/animation',
      'Animations',
      this.animations,
      path.join(folder, 'animations.ts'),
    );
    saveArray(
      'AnimationController',
      '../../types/resourcepack/animation_controller',
      'AnimationControllers',
      this.animationControllers,
      path.join(folder, 'animation_controllers.ts'),
    );
    saveArray('Entity', '../../types/resourcepack/entity', 'Entities', this.entities, path.join(folder, 'entities.ts'));
    saveArray('Model', '../../types/resourcepack/model', 'Models', this.models, path.join(folder, 'models.ts'));
    saveArray(
      'string',
      null,
      'Fogs',
      this.fogs.map((f) => f.id),
      path.join(folder, 'fogs.ts'),
    );
    saveArray(
      'string',
      null,
      'Materials',
      this.materials.map((m) => m.id),
      path.join(folder, 'materials.ts'),
    );
    saveArray(
      'string',
      null,
      'Particles',
      this.particles.map((p) => p.id),
      path.join(folder, 'particles.ts'),
    );
    saveArray(
      'string',
      null,
      'RenderControllers',
      this.renderControllers.map((rc) => rc.id),
      path.join(folder, 'render_controllers.ts'),
    );
    saveArray('string', null, 'SoundFiles', this.soundFiles, path.join(folder, 'sounds_files.ts'));
    saveArray(
      'string',
      null,
      'Sounds',
      this.sounds.map((s) => s.id),
      path.join(folder, 'sounds.ts'),
    );
    saveArray(
      'string',
      null,
      'TextureItems',
      this.textureItems.map((ti) => ti.id),
      path.join(folder, 'texture-atlas-item.ts'),
    );
    saveArray(
      'string',
      null,
      'Textures',
      this.textures.map((t) => t.id),
      path.join(folder, 'textures.ts'),
    );
    saveArray(
      'string',
      null,
      'TextureTerrain',
      this.textureTerrain.map((tt) => tt.id),
      path.join(folder, 'texture-atlas-terrain.ts'),
    );
  }

  /**
   * Clean and deduplicate data
   */
  clean(): void {
    this.animationControllers = ensureProperties(
      cleanIdentifiers(this.animationControllers),
      createAnimationController,
    );
    this.animations = ensureProperties(cleanIdentifiers(this.animations), createAnimation);
    this.entities = ensureProperties(cleanIdentifiers(this.entities), createEntity);
    this.fogs = ensureProperties(cleanIdentifiers(this.fogs), createFog);
    this.materials = ensureProperties(cleanIdentifiers(this.materials), createMaterial);
    this.models = ensureProperties(cleanIdentifiers(this.models), createModel);
    this.particles = ensureProperties(cleanIdentifiers(this.particles), createParticle);
    this.renderControllers = ensureProperties(cleanIdentifiers(this.renderControllers), createRenderController);
    this.sounds = ensureProperties(cleanIdentifiers(this.sounds), createSound);
    this.textures = ensureProperties(cleanIdentifiers(this.textures), createTexture);
    this.textureItems = ensureProperties(cleanIdentifiers(this.textureItems), createTextureAtlas);
    this.textureTerrain = ensureProperties(cleanIdentifiers(this.textureTerrain), createTextureAtlas);
    this.soundFiles.sort();
  }
}
