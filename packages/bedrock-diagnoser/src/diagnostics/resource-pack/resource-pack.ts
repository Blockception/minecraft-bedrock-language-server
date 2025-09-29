import { DocumentDiagnosticsBuilder } from '../../types';
import { FileType } from 'bc-minecraft-bedrock-project/src/project/resource-pack';

import * as Animation from './animation/document';
import * as AnimationController from './animation-controllers/document';
import * as Attachable from './attachable/document';
import * as BlockCulling from './block-culling/document';
import * as BiomesClient from './biomes-client/document';
import * as Block from './block/document';
import * as Blocks from './block/document';
import * as Entity from './entity/document';
import * as Fog from './fog/document';
import * as Item from './item/document';
import * as Manifest from './manifest/entry';
import * as Material from './material/entry';
import * as Model from './model/entry';
import * as MusicDefinitions from './music-definitions/entry';
import * as Particle from './particle/entry';
import * as RenderController from './render-controller/entry';
import * as Sounds from './sounds/entry';
import * as SoundsDefinitions from './sounds-definitions/entry';
import * as Texture from './texture/entry';
import * as TextureAtlas from './texture-atlas/entry';
import * as Flipbook from './texture-atlas/flipbook';

/** The namespace that deals with resourcepack diagnostics */
export namespace ResourcePack {
  /**
   * Processes and diagnoses the given textdocument
   * @param doc The document to process / diagnose
   * @param diagnoser The diagnoser to report to
   * @returns `true` or `false` whenever or not it was succesfull */
  export function diagnose_document(diagnoser: DocumentDiagnosticsBuilder): boolean {
    const uri = diagnoser.document.uri;
    const type = FileType.detect(uri);

    switch (type) {
      case FileType.animation:
        Animation.diagnose_animation_document(diagnoser);
        break;

      case FileType.animation_controller:
        AnimationController.diagnose_animation_controller_document(diagnoser);
        break;

      case FileType.attachable:
        Attachable.diagnose_attachable_document(diagnoser);
        break;

      case FileType.block_culling_rules:
        BlockCulling.diagnose_block_culling_document(diagnoser);
        break;

      case FileType.biomes_client:
        BiomesClient.diagnose_biomes_client_document(diagnoser);
        break;

      case FileType.block:
        if (uri.endsWith('blocks.json')) {
          Blocks.diagnose_block_document(diagnoser);
        } else {
          Block.diagnose_block_document(diagnoser);
        }

        break;

      case FileType.entity:
        Entity.diagnose_entity_document(diagnoser);
        break;

      case FileType.fog:
        Fog.diagnose_fog_document(diagnoser);
        break;

      case FileType.item:
        Item.Diagnose(diagnoser);
        break;

      case FileType.manifest:
        Manifest.diagnose_manifest_document(diagnoser);
        break;

      case FileType.material:
        Material.diagnose_material_document(diagnoser);
        break;

      case FileType.model:
        Model.diagnose_model_document(diagnoser);
        break;

      case FileType.music_definitions:
        MusicDefinitions.diagnose_music_definitions_document(diagnoser);
        break;

      case FileType.particle:
        Particle.diagnose_particle_document(diagnoser);
        break;

      case FileType.render_controller:
        RenderController.Diagnose(diagnoser);
        break;

      case FileType.sounds:
        Sounds.diagnose_sounds_document(diagnoser);
        break;

      case FileType.sounds_definitions:
        SoundsDefinitions.diagnose_sound_definitions_document(diagnoser);
        break;

      case FileType.texture:
        Texture.diagnose_texture_document(diagnoser);
        break;

      case FileType.texture_flipbook_atlas:
        Flipbook.DiagnoseFlipbook(diagnoser);
        break;

      case FileType.texture_item_atlas:
      case FileType.texture_terrain_atlas:
        TextureAtlas.diagnose_atlas_document(diagnoser);
        break;

      default:
      case FileType.unknown:
        return false;
    }

    return true;
  }
}
