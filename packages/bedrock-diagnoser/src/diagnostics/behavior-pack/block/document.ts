import { Internal } from 'bc-minecraft-bedrock-project';
import { FormatVersion } from 'bc-minecraft-bedrock-types/src/minecraft';
import { getUsedComponents } from 'bc-minecraft-bedrock-types/src/minecraft/components';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { Context } from '../../../utility/components';
import { Json } from '../../json';
import { lint_check_block_naming, lint_check_identity_format, lint_check_namespace, lint_check_namespace_required } from '../../lint';
import { diagnose_molang_syntax_current_document } from '../../molang';
import { no_other_duplicates } from '../../packs/duplicate-check';
import { behaviorpack_block_components_dependencies } from './components/dependencies';
import { behaviorpack_diagnose_block_components, minimum_version_required } from './components/diagnose';

/**Diagnoses the given document as an bp block
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_block_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const block = Json.LoadReport<Internal.BehaviorPack.Block>(diagnoser);
  if (!Internal.BehaviorPack.Block.is(block)) return;

  const identifier = block['minecraft:block'].description.identifier;
  const context: Context<Internal.BehaviorPack.Block> = {
    source: block,
    components: getUsedComponents(block['minecraft:block']),
  };

  diagnose_molang_syntax_current_document(diagnoser, block);
  behaviorpack_diagnose_block_components(block['minecraft:block'], context, diagnoser);
  behaviorpack_block_components_dependencies(block, context, diagnoser);

  // Run configurable lint checks for identity format, namespace, and block naming
  lint_check_identity_format(identifier, diagnoser);
  lint_check_namespace(identifier, diagnoser);
  lint_check_namespace_required(identifier, diagnoser);
  lint_check_block_naming(identifier, diagnoser);

  // check that no other exists with this id
  no_other_duplicates(
    'behaviorpack.block',
    diagnoser.context.getProjectData().projectData.behaviorPacks.blocks,
    identifier,
    diagnoser,
  );

  //check components
  block['minecraft:block']?.permutations?.forEach((p) => {
    context.components.push(...getUsedComponents(p));
    behaviorpack_diagnose_block_components(p, { ...context, isPermutation: true }, diagnoser);
  });

  if (block['minecraft:block']['events']) {
    diagnoser.add(
      `events`,
      `Block events have been deprecated in favour of \`minecraft:custom_components\`.`,
      DiagnosticSeverity.error,
      'behaviorpack.block.deprecated',
    );
  }

  const group = (block['minecraft:block'].description as any).menu_category?.group;
  if (typeof group != 'string') return;

  //TODO: Check if group name is valid

  try {
    const greaterThan = FormatVersion.isGreaterThan(context.source.format_version as FormatVersion, [1, 21, 50]);
    if (greaterThan && group.startsWith('itemGroup')) {
      diagnoser.add(
        group,
        `Item groups must be namespaced in versions > 1.21.50`,
        DiagnosticSeverity.warning,
        'behaviorpack.block.namespace_group',
      );
    }
    if (!greaterThan && group.includes(':')) {
      diagnoser.add(
        group,
        `Item groups cannot be namespaced in versions <= 1.21.50`,
        DiagnosticSeverity.warning,
        'behaviorpack.block.namespace_group',
      );
    }
  } catch (err) {
    // Leaving empty as the base diagnoser should flag an invalid format version
  }

  const traits = (block['minecraft:block'].description as any).traits;
  if (typeof traits == 'object') Object.entries(traits).forEach(([key, value]: [string, any]) => {
    diagnose_block_trait(key, value, context, diagnoser);
  });
}

function diagnose_block_trait(name: string, trait: any, context: Context<Internal.BehaviorPack.Block>, diagnoser: DocumentDiagnosticsBuilder) {
  switch (name) {
    case 'minecraft:connection':
      minimum_version_required(context.source, name, [1, 26, 0], diagnoser);
      break;
    case 'minecraft:placement_direction':

      if (trait.blocks_to_corner_with !== undefined || trait.enabled_states.includes('minecraft:corner_and_cardinal_direction')) minimum_version_required(context.source, name, [1, 26, 0], diagnoser);

      if (trait.blocks_to_corner_with !== undefined && !trait.enabled_states.includes('"minecraft:corner_and_cardinal_direction"')) diagnoser.add(
        name,
        `"blocks_to_corner_with" now requires "minecraft:corner_and_cardinal_direction" to be one of the "enabled_states"`,
        DiagnosticSeverity.error,
        'behaviorpack.block.traits.blocks_to_corner_with'
      )
      break;
    case 'minecraft:placement_position':
      minimum_version_required(context.source, name, [1, 20, 20], diagnoser);
      break;
  }
}