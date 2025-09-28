import { Internal } from "bc-minecraft-bedrock-project";
import { getUsedComponents } from "bc-minecraft-bedrock-types/src/minecraft/components";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { DocumentDiagnosticsBuilder } from "../../../types";
import { Context } from "../../../utility/components";
import { education_enabled } from "../../definitions";
import { Json } from "../../json";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { texture_files_diagnose } from "../texture-atlas";
import { resourcepack_diagnose_particle_components } from "./components";

/**Diagnoses the given document as a particle
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_particle_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const particle = Json.LoadReport<Internal.ResourcePack.Particle>(diagnoser);
  if (!Internal.ResourcePack.Particle.is(particle)) return;
  diagnose_molang_syntax_current_document(diagnoser, particle);

  //check components
  const context: Context<Internal.ResourcePack.Particle> = {
    source: particle,
    components: getUsedComponents(particle.particle_effect.components),
  };
  resourcepack_diagnose_particle_components(particle.particle_effect, context, diagnoser);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const texture = particle.particle_effect?.description?.["basic_render_parameters"]?.["texture"];

  if (typeof texture != "string") return;

  const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
  if (pack === undefined) return;

  if (MinecraftData.ResourcePack.hasTexture(texture, education_enabled(diagnoser))) return;

  const rp_files = diagnoser.context
    .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
    .map((item) => item.replace(/\\/gi, "/"));

  texture_files_diagnose("texture", texture, rp_files, diagnoser);
}
