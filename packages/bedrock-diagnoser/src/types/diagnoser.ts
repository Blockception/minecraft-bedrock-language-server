import { Pack, PackType, TextDocument } from "bc-minecraft-bedrock-project";
import { MCIgnore } from "bc-minecraft-project";
import { BehaviorPack } from "../diagnostics/behavior-pack";
import { format_diagnose_path } from "../diagnostics/format";
import { diagnose_language_document } from "../diagnostics/minecraft";
import { ResourcePack } from "../diagnostics/resource-pack";
import { SkinPack } from "../diagnostics/skin-pack/skin-pack";
import { WorldPack } from "../diagnostics/world-pack/world-pack";
import { DiagnoserContext, ManagedDiagnosticsBuilder } from "./diagnoser-context";
import { DocumentDiagnosticsBuilder } from "./diagnostics-builder";
import { DiagnosticSeverity } from "./severity";

import path from "path";

/**The object that is responsible for diagnosing minecraft bedrock files*/
export class Diagnoser<T extends TextDocument = TextDocument> {
  /**The context needed to perform diagnostics*/
  readonly context: DiagnoserContext<T>;

  /**Create a new instance of Diagnoser
   * @param context The context needed to perform diagnostics*/
  constructor(context: DiagnoserContext<T>) {
    this.context = context;
  }

  /** process and diagnoses the given document
   * @param doc The textdocument to process or the uri to the document
   * @returns `true` or `false` if the diagnostics was successfully*/
  process(doc: T | string): boolean {
    if (typeof doc === "string") {
      const temp = this.context.getDocument(doc);

      if (!temp) return false;
      doc = temp;
    }

    const pack = this.context.getProjectData().projectData.get(doc);
    if (!pack) return false;

    //Check if diagnostics was disabled
    const ext = path.extname(doc.uri);

    //Check if diagnostics for this file type is disabled
    if (pack.context.attributes["diagnostic" + ext] === "false") return false;

    const diagnoser = this.context.getDiagnoser(doc, pack.context) as DocumentDiagnosticsBuilder<T> &
      ManagedDiagnosticsBuilder<T>;
    if (!diagnoser) return false;

    diagnoser.document = doc;
    let out = false;

    try {
      //diagnose path
      format_diagnose_path(pack, doc.uri, diagnoser);

      //Language file?
      if (doc.uri.endsWith(".lang")) {
        diagnose_language_document(diagnoser, pack.type);
      } else {
        //Check per pack
        switch (pack.type) {
          case PackType.behavior_pack:
            out = BehaviorPack.diagnose_document(diagnoser);
            break;

          case PackType.resource_pack:
            out = ResourcePack.diagnose_document(diagnoser);
            break;

          case PackType.skin_pack:
            out = SkinPack.diagnose_document(diagnoser);
            break;

          case PackType.world:
            out = WorldPack.diagnose_document(diagnoser);
            break;
        }
      }
    } catch (err: any) {
      let msg;

      if (err.message && err.stack) {
        msg = `${err.message}\n\t${err.stack}`;
      } else {
        msg = JSON.stringify(err);
      }

      diagnoser.add({ character: 0, line: 0 }, msg, DiagnosticSeverity.error, "debugger.internal.exception");
    }

    diagnoser.done();
    return out;
  }

  /**Diagnoses the entire given folder
   * @param folder The folder to retrieve files of
   * @param ignores The pattern to ignore on files*/
  processFolder(folder: string, ignores: MCIgnore): boolean {
    const files = this.context.getFiles(folder, ["*"], ignores);
    let out = false;

    for (let I = 0; I < files.length; I++) {
      out = this.process(files[I]) || out;
    }

    return out;
  }

  /**process the entire given pack
   * @param pack The pack to process
   * @returns True or false is something was processed*/
  processPack(pack: Pack): boolean {
    return this.processFolder(pack.folder, pack.context.ignores);
  }
}
