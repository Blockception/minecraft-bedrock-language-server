import { DocumentLocation, Location, OffsetWord } from 'bc-minecraft-bedrock-shared';
import { BehaviorPack, ProjectItem } from 'bc-minecraft-bedrock-project';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';

/** Checks if the blocks exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export function behaviorpack_check_blockstates(blockDescriptor: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  //If the block has no states then skip
  if (!blockDescriptor.text.includes('[')) return;

  //Parses states
  const blockData = Minecraft.Block.fromBlockDescriptor(blockDescriptor.text);

  // ^ Returns ['"state"'] instead of ['state']; this fixes that
  blockData.states.forEach((state) => {
    if (state.property.startsWith('"') && state.property.endsWith('"'))
      state.property = state.property.substring(1, state.property.length - 1);
  });

  check_block_definition(blockData, blockDescriptor, diagnoser);
}

/**
 *
 * @param blockId
 * @param states
 * @param diagnoser
 */
export function behaviorpack_check_command_blockstates(
  blockId: OffsetWord,
  states: OffsetWord,
  diagnoser: DiagnosticsBuilder,
): void {
  const blockData: Minecraft.Block = {
    id: blockId.text,
    location: Location.empty(),
    states: [],
  };

  // Is state properly formatted?
  if (states.text.startsWith('[') && states.text.endsWith(']')) {
    const value = states.text.substring(1, states.text.length - 1);
    const split = value.split(',');

    // For each state
    for (let i = 0; i < split.length; i++) {
      const item = split[i];
      //TODO standardize this assignment pattern deconstruction
      const state = split[i].split('=').map((part) => part.trim());

      // Is state properly defined
      if (state.length == 2) {
        // eslint-disable-next-line prefer-const
        let [property, value] = state;

        // property is a string literal?
        if (property.startsWith('"') && property.endsWith('"')) {
          property = property.substring(1, property.length - 1);
          blockData.states.push({ value, property });
        } else {
          diagnoser.add(
            blockId,
            `Invalid state: '${property}' in '${item}' on the block state definition: '${states.text}', needs to be a string literal with ""`,
            DiagnosticSeverity.error,
            'behaviorpack.block.states.invalid',
          );
        }
      } else if (state[0] !== '') {
        diagnoser.add(
          states,
          `Invalid state: '${item}' in the block command, needs to be in the format ["state"=value] :`,
          DiagnosticSeverity.error,
          'behaviorpack.block.states.invalid',
        );
      }
    }
  } else {
    diagnoser.add(
      states,
      `Invalid states: '${states.text}' in the block command, needs to be a list with []`,
      DiagnosticSeverity.error,
      'behaviorpack.block.states.invalid',
    );
  }

  check_block_definition(blockData, states, diagnoser);
}

function check_block_definition(
  blockDefinition: Minecraft.Block,
  location: DocumentLocation,
  diagnoser: DiagnosticsBuilder,
) {
  const blockItem = diagnoser.context.getProjectData().behaviors.blocks.get(blockDefinition.id, diagnoser.project);
  if (!blockItem) return;
  if (!ProjectItem.is(blockItem)) return;
  const block = blockItem.item;

  if (block.states.length == 0 && blockDefinition.states.length > 0) {
    //Block has not defined states, but states are being used

    diagnoser.add(
      location,
      `Block: ${block.id} has no defined states`,
      DiagnosticSeverity.error,
      'behaviorpack.block.states.missing',
    );

    return;
  }

  blockDefinition.states.forEach((state) => {
    check_state(state, block, location, diagnoser);
  });
}

/**
 *
 * @param blockDescriptor
 * @param state
 * @param data
 * @param diagnoser
 * @returns
 */
function check_state(
  state: Minecraft.BlockState,
  data: BehaviorPack.Block.Block,
  location: DocumentLocation,
  diagnoser: DiagnosticsBuilder,
) {
  for (let I = 0; I < data.states.length; I++) {
    const stateData = data.states[I];

    //If found state with the same name
    if (stateData.name === state.property) {
      let actual = state.value;
      const values = stateData.values;

      if (stateData.type === 'string') {
        if (actual.startsWith('"') && actual.endsWith('"')) {
          actual = actual.substring(1, actual.length - 1);
        } else {
          diagnoser.add(
            location,
            `Invalid state value: '${state.value}' for state: '${state.property}' in the block definition: '${data.id}', needs to be a string literal with ""`,
            DiagnosticSeverity.error,
            'behaviorpack.block.states.invalid',
          );

          return;
        }
      }

      //Check if the state value is valid
      for (const expect of values) {
        // Compare int/bool/string values
        if (String(expect) == actual) {
          // String() because "true" != true unlike "2" == 2
          return;
        }
      }

      diagnoser.add(
        location,
        `Invalid state value: '${state.value}' for state: '${state.property}' in the block definition: '${
          data.id
        }'\nValid values are: ${values.join(',')}`,
        DiagnosticSeverity.error,
        'behaviorpack.block.states.invalid',
      );

      return;
    }
  }

  //No state matching found
  diagnoser.add(
    location,
    `Missing state: '${state.property}' in the block definition: '${data.id}'`,
    DiagnosticSeverity.error,
    'behaviorpack.block.states.missing',
  );
}
