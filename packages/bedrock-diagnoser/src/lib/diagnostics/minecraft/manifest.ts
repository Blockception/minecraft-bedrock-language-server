import { Manifest, ManifestHeader } from "bc-minecraft-bedrock-project/lib/src/internal/types";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../types";

export function minecraft_manifest_diagnose(m: Manifest, diagnoser: DiagnosticsBuilder): void {
  minecraft_manifest_header_diagnose(m.header, diagnoser);

  m.modules?.forEach((m) => {
    minecraft_manifest_version(m.version, diagnoser, "modules/version");
  });
}

export function minecraft_manifest_header_diagnose(m: ManifestHeader, diagnoser: DiagnosticsBuilder): void {
  //Version check
  minecraft_manifest_version(m.version, diagnoser, "header/version");
}

/**
 *
 * @param m
 * @param diagnoser
 * @param required_type
 * @returns
 */
export function minecraft_manifest_required_module(
  m: Manifest,
  diagnoser: DiagnosticsBuilder,
  ...required_type: string[]
): boolean {
  const modules = m.modules;

  if (modules) {
    for (let I = 0; I < modules.length; I++) {
      const module = modules[I];

      if (typeof module.type === "string" && required_type.includes(module.type)) return true;
    }
  }

  //No correct module found
  diagnoser.add(
    "modules",
    "This manifest is required to have the following module type one of " + required_type.join(", "),
    DiagnosticSeverity.error,
    "minecraft.manifest.module.missing"
  );

  return false;
}

export function minecraft_manifest_version(
  version: number[] | string,
  diagnoser: DiagnosticsBuilder,
  path: string
): void {
  if (typeof version == "string") {
    if (
      !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(
        version
      )
    )
      diagnoser.add(
        path,
        "Version string needs to match semver",
        DiagnosticSeverity.error,
        "minecraft.manifest.version.invalid"
      );
    return;
  }

  if (version.length != 3) {
    diagnoser.add(
      path,
      "The version number needs to be an array of 3 items",
      DiagnosticSeverity.error,
      "minecraft.manifest.version.invalid"
    );
  }

  if (version[0] < 1) {
    diagnoser.add(
      `${path}/${version[0]}`,
      "By convention, the version numbering needs to be atleast [1, 0, 0]",
      DiagnosticSeverity.warning,
      "minecraft.manifest.version.minimum"
    );
  }
}
