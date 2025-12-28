import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import path from 'path';
import { DiagnosticsBuilder, DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { education_enabled } from '../../definitions';
import { Json } from '../../json/json';

/**Diagnoses the given document as a texture atlas
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_atlas_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const definitions = Json.LoadReport<TextureAtlas>(diagnoser);
  if (!TextureAtlas.is(definitions)) return;

  //Get pack for files search
  const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
  if (pack === undefined) return;

  const texture_data = definitions.texture_data;
  const texture_files = diagnoser.context
    .getFiles(pack.folder, ['**/textures/**/*.{tga,png,jpg,jpeg}'], pack.context.ignores)
    .map((item) => item.replace(/\\/gi, '/'));

  //Check if files exists
  const check_file_spec: (texture_id: string, item: DetailedTextureSpec) => void = (texture_id, item) => {
    if (typeof item.path === 'string') {
      texture_files_diagnose(texture_id, item.path, texture_files, diagnoser);
    }

    if (item.variations) {
      item.variations.forEach((subitem) => {
        if (typeof subitem.path === 'string') {
          texture_files_diagnose(texture_id, subitem.path, texture_files, diagnoser);
        }
      });
    }
  };

  Object.entries(texture_data).forEach(([texture_id, data]) => {
    const textures = data.textures;
    //If texture
    if (typeof textures === 'string') {
      texture_files_diagnose(texture_id, textures, texture_files, diagnoser);
      //If array of items
    } else if (Array.isArray(textures)) {
      textures.forEach((texture) => {
        if (typeof texture === 'string') {
          texture_files_diagnose(texture_id, texture, texture_files, diagnoser);
        } else {
          check_file_spec(texture_id, texture);
        }
      });
    } else {
      check_file_spec(texture_id, data.textures);
    }
  });
}

export function texture_files_diagnose(
  owner: string,
  file: string,
  files: string[],
  diagnoser: DiagnosticsBuilder,
): void {
  files = files.map((location) =>
    location.includes('.') ? location.slice(0, -path.extname(location).length) : location,
  );
  
  // Encode the search term to match URI-encoded file paths (encodeURI keeps slashes as-is)
  let encodedFile = file;
  if (file.includes('.')) {
    encodedFile = file.slice(0, -path.extname(file).length);
  }
  encodedFile = encodeURI(encodedFile);
  
  for (let I = 0; I < files.length; I++) {
    if (files[I].endsWith(encodedFile)) {
      //Found then return
      return;
    }
  }

  if (MinecraftData.ResourcePack.hasTexture(file, education_enabled(diagnoser))) return;

  diagnoser.add(
    `${owner}/${file}`,
    `Cannot find file: ${file}`,
    DiagnosticSeverity.error,
    'resourcepack.texture.missing',
  );
}

interface TextureAtlas {
  resource_pack_name?: string;
  texture_name?: string;
  texture_data: Map<string, TextureSpec>;
}

namespace TextureAtlas {
  export function is(value: any): value is TextureAtlas {
    if (typeof value === 'object' && typeof value.texture_data === 'object') return true;

    return false;
  }
}

interface DetailedTextureSpec {
  variations?: { path?: string }[];
  path?: string;
}

type TexturePath = DetailedTextureSpec | string;

interface TextureSpec {
  textures: TexturePath | TexturePath[];
}
