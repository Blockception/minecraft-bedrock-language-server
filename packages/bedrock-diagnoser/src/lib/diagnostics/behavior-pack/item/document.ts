import { Internal } from "bc-minecraft-bedrock-project";
import { getUsedComponents } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../types";
import { Context } from "../../../utility/components";
import { Json } from "../../json";
import { behaviorpack_item_components_dependencies } from "./components/dependencies";
import { behaviorpack_diagnose_item_components } from "./components/diagnose";
import { no_other_duplicates } from "../../packs/duplicate-check";
import { FormatVersion } from "bc-minecraft-bedrock-types/lib/minecraft";
import { diagnose_molang_syntax_current_document } from "../../molang";

/**Diagnoses the given document as an item
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_item_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const item = Json.LoadReport<Internal.BehaviorPack.Item>(diagnoser);
  if (!Internal.BehaviorPack.Item.is(item)) return;
  diagnose_molang_syntax_current_document(diagnoser, item);

  const identifier = item["minecraft:item"].description.identifier;
  // check that no other exists with this id
  no_other_duplicates(
    "behaviorpack.block",
    diagnoser.context.getProjectData().projectData.behaviorPacks.items,
    identifier,
    diagnoser
  );

  //Check components
  const context: Context<Internal.BehaviorPack.Item> = {
    source: item,
    components: getUsedComponents(item["minecraft:item"]),
  };

  if (
    !item["minecraft:item"]["components"]?.["minecraft:icon"] &&
    !item["minecraft:item"]["components"]?.["minecraft:block_placer"]?.replace_block_item
  )
    diagnoser.add(
      "components",
      "`minecraft:icon` or `minecraft:block_placer`.`replace_block_item` == `true`) is required.",
      DiagnosticSeverity.error,
      "behaviorpack.item.components.icon"
    );

  behaviorpack_diagnose_item_components(item["minecraft:item"], context, diagnoser);

  behaviorpack_item_components_dependencies(item, context, diagnoser);

  if (item["minecraft:item"]["events"])
    diagnoser.add(
      `events`,
      `Item events have been deprecated in favour of \`minecraft:custom_components\`.`,
      DiagnosticSeverity.error,
      "behaviorpack.item.deprecated"
    );

  const group = (item["minecraft:item"].description as any).menu_category?.group;
  if (typeof group != "string") return;

  //TODO: Check if group name is valid

  try {
    const parsedVersion = FormatVersion.parse(context.source.format_version);
    const greaterThan = FormatVersion.isGreaterThan(parsedVersion, [1, 21, 50]);

    if (greaterThan && group.startsWith("itemGroup"))
      diagnoser.add(
        group,
        `Item groups must be namespaced in versions > 1.21.50`,
        DiagnosticSeverity.warning,
        "behaviorpack.item.namespace_group"
      );
    if (!greaterThan && group.includes(":"))
      diagnoser.add(
        group,
        `Item groups cannot be namespaced in versions <= 1.21.50`,
        DiagnosticSeverity.warning,
        "behaviorpack.item.namespace_group"
      );

    if (
      FormatVersion.isLessThan(parsedVersion, [1, 21, 90]) &&
      context.components.some((name) => !name.startsWith("minecraft:"))
    )
      diagnoser.add(
        "format_version",
        `To use custom components, a format version <= 1.21.90 is required`,
        DiagnosticSeverity.warning,
        "behaviorpack.item.custom_component_v2.min_version"
      );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // Leaving empty as the base diagnoser should flag an invalid format version
  }
}
