import { TextDocument } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { DiagnosticsBuilder, DiagnosticsBuilderContent } from "./diagnostics-builder";

export class NoopDiagnoser<T extends TextDocument> implements DiagnosticsBuilder<T> {
  context: DiagnosticsBuilderContent<T>;
  project: MCProject;

  constructor(base: DiagnosticsBuilder<T>) {
    this.context = base.context;
    this.project = base.project;
  }

  add(): void {
    //Do nothing
  }
}
