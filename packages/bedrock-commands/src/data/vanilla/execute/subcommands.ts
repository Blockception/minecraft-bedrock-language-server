import { ParameterType } from '../../../types/parameter-type';
import { CommandContainer } from '../../command-container';

export const executeSubCommands: CommandContainer = {
  align: [
    {
      name: 'align',
      documentation: 'Aligns the origin to the specified axis.',
      permission_level: 1,
      parameters: [
        { text: 'align', type: ParameterType.keyword, required: true },
        //TODO: Add the axis parameter type
        {
          text: 'axes',
          type: ParameterType.string,
          required: true,
          options: { acceptedValues: ['x', 'y', 'z', 'xy', 'xz', 'yz', 'xyz'] },
        },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  // anchored
  anchored: [
    {
      name: 'anchored',
      documentation: 'Sets the anchor point for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'anchored', type: ParameterType.keyword, required: true },
        { text: 'eyes', type: ParameterType.keyword, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    {
      name: 'anchored',
      documentation: 'Sets the anchor point for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'anchored', type: ParameterType.keyword, required: true },
        { text: 'feet', type: ParameterType.keyword, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  as: [
    {
      name: 'as',
      documentation: 'Executes as the specified entity.',
      permission_level: 1,
      parameters: [
        { text: 'as', type: ParameterType.keyword, required: true },
        { text: 'origin', type: ParameterType.selector, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  at: [
    {
      name: 'at',
      documentation: 'Sets the origin to the specified entity.',
      permission_level: 1,
      parameters: [
        { text: 'at', type: ParameterType.keyword, required: true },
        { text: 'origin', type: ParameterType.selector, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  // Facing
  facing: [
    {
      name: 'facing',
      documentation: 'Sets the facing direction for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'facing', type: ParameterType.keyword, required: true },
        { text: 'x', type: ParameterType.coordinate, required: true },
        { text: 'y', type: ParameterType.coordinate, required: true },
        { text: 'z', type: ParameterType.coordinate, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    {
      name: 'facing',
      documentation: 'Sets the facing direction for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'facing', type: ParameterType.keyword, required: true },
        { text: 'entity', type: ParameterType.keyword, required: true },
        { text: 'origin', type: ParameterType.selector, required: true },
        { text: 'eyes', type: ParameterType.keyword, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    {
      name: 'facing',
      documentation: 'Sets the facing direction for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'facing', type: ParameterType.keyword, required: true },
        { text: 'entity', type: ParameterType.keyword, required: true },
        { text: 'origin', type: ParameterType.selector, required: true },
        { text: 'feet', type: ParameterType.keyword, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  // in
  in: [
    {
      name: 'in',
      documentation: 'Sets the dimension for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'in', type: ParameterType.keyword, required: true },
        { text: 'dimension', type: ParameterType.dimension, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  // positioned
  positioned: [
    {
      name: 'positioned',
      documentation: 'Sets the position for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'positioned', type: ParameterType.keyword, required: true },
        { text: 'x', type: ParameterType.coordinate, required: true },
        { text: 'y', type: ParameterType.coordinate, required: true },
        { text: 'z', type: ParameterType.coordinate, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    {
      name: 'positioned',
      documentation: 'Sets the position for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'positioned', type: ParameterType.keyword, required: true },
        { text: 'as', type: ParameterType.keyword, required: true },
        { text: 'origin', type: ParameterType.selector, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  //rotated
  rotated: [
    {
      name: 'rotated',
      documentation: 'Sets the rotation for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'rotated', type: ParameterType.keyword, required: true },
        { text: 'yaw', type: ParameterType.coordinate, required: true },
        { text: 'pitch', type: ParameterType.coordinate, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    {
      name: 'rotated',
      documentation: 'Sets the rotation for the origin.',
      permission_level: 1,
      parameters: [
        { text: 'rotated', type: ParameterType.keyword, required: true },
        { text: 'as', type: ParameterType.keyword, required: true },
        { text: 'origin', type: ParameterType.selector, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  run: [
    {
      name: 'run',
      documentation: 'Executes the specified command.',
      permission_level: 1,
      parameters: [
        { text: 'run', type: ParameterType.keyword, required: true },
        { text: 'command', type: ParameterType.command, required: true },
      ],
    },
  ],
  // If block x y z block blockstates next
  if: [
    {
      name: 'if',
      documentation: 'Executes the command if the specified condition is true.',
      permission_level: 1,
      parameters: [
        { text: 'if', type: ParameterType.keyword, required: true },
        { text: 'block', type: ParameterType.keyword, required: true },
        { text: 'x', type: ParameterType.coordinate, required: true },
        { text: 'y', type: ParameterType.coordinate, required: true },
        { text: 'z', type: ParameterType.coordinate, required: true },
        { text: 'block', type: ParameterType.block, required: true },
        { text: 'states', type: ParameterType.blockStates, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // If block x y z block next
    {
      name: 'if',
      documentation: 'Executes the command if the specified condition is true.',
      permission_level: 1,
      parameters: [
        { text: 'if', type: ParameterType.keyword, required: true },
        { text: 'block', type: ParameterType.keyword, required: true },
        { text: 'x', type: ParameterType.coordinate, required: true },
        { text: 'y', type: ParameterType.coordinate, required: true },
        { text: 'z', type: ParameterType.coordinate, required: true },
        { text: 'block', type: ParameterType.block, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // if block x y z x y z x y z scan next
    {
      name: 'if',
      documentation: 'Executes the command if the specified condition is true.',
      permission_level: 1,
      parameters: [
        { text: 'if', type: ParameterType.keyword, required: true },
        { text: 'blocks', type: ParameterType.keyword, required: true },
        { text: 'begin x', type: ParameterType.coordinate, required: true },
        { text: 'begin y', type: ParameterType.coordinate, required: true },
        { text: 'begin z', type: ParameterType.coordinate, required: true },
        { text: 'end x', type: ParameterType.coordinate, required: true },
        { text: 'end y', type: ParameterType.coordinate, required: true },
        { text: 'end z', type: ParameterType.coordinate, required: true },
        { text: 'destination x', type: ParameterType.coordinate, required: true },
        { text: 'destination y', type: ParameterType.coordinate, required: true },
        { text: 'destination z', type: ParameterType.coordinate, required: true },
        { text: 'scan mode', type: ParameterType.scanMode, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // If entity target next
    {
      name: 'if',
      documentation: 'Executes the command if the specified condition is true.',
      permission_level: 1,
      parameters: [
        { text: 'if', type: ParameterType.keyword, required: true },
        { text: 'entity', type: ParameterType.keyword, required: true },
        { text: 'target', type: ParameterType.selector, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // If score target objective operation source objective next
    {
      name: 'if',
      documentation: 'Executes the command if the specified condition is true.',
      permission_level: 1,
      parameters: [
        { text: 'if', type: ParameterType.keyword, required: true },
        { text: 'score', type: ParameterType.keyword, required: true },
        {
          text: 'target',
          type: ParameterType.selector,
          required: true,
          options: {
            allowFakePlayers: true,
          },
        },
        { text: 'objective', type: ParameterType.objective, required: true },
        { text: 'operation', type: ParameterType.operation, required: true },
        { text: 'source', type: ParameterType.selector, required: true },
        { text: 'objective', type: ParameterType.objective, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // If score target objective matches range next
    {
      name: 'if',
      documentation: 'Executes the command if the specified condition is true.',
      permission_level: 1,
      parameters: [
        { text: 'if', type: ParameterType.keyword, required: true },
        { text: 'score', type: ParameterType.keyword, required: true },
        { text: 'target', type: ParameterType.selector, required: true },
        { text: 'objective', type: ParameterType.objective, required: true },
        { text: 'matches', type: ParameterType.keyword, required: true },
        { text: 'range', type: ParameterType.integer_range, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
  // Unless
  // Unless block x y z block blockstates next
  unless: [
    {
      name: 'unless',
      documentation: 'Executes the command unless the specified condition is false.',
      permission_level: 1,
      parameters: [
        { text: 'unless', type: ParameterType.keyword, required: true },
        { text: 'block', type: ParameterType.keyword, required: true },
        { text: 'x', type: ParameterType.coordinate, required: true },
        { text: 'y', type: ParameterType.coordinate, required: true },
        { text: 'z', type: ParameterType.coordinate, required: true },
        { text: 'block', type: ParameterType.block, required: true },
        { text: 'states', type: ParameterType.blockStates, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // Unless block x y z block next
    {
      name: 'unless',
      documentation: 'Executes the command unless the specified condition is false.',
      permission_level: 1,
      parameters: [
        { text: 'unless', type: ParameterType.keyword, required: true },
        { text: 'block', type: ParameterType.keyword, required: true },
        { text: 'x', type: ParameterType.coordinate, required: true },
        { text: 'y', type: ParameterType.coordinate, required: true },
        { text: 'z', type: ParameterType.coordinate, required: true },
        { text: 'block', type: ParameterType.block, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // unless block x y z x y z x y z scan next
    {
      name: 'unless',
      documentation: 'Executes the command unless the specified condition is false.',
      permission_level: 1,
      parameters: [
        { text: 'unless', type: ParameterType.keyword, required: true },
        { text: 'block', type: ParameterType.keyword, required: true },
        { text: 'begin x', type: ParameterType.coordinate, required: true },
        { text: 'begin y', type: ParameterType.coordinate, required: true },
        { text: 'begin z', type: ParameterType.coordinate, required: true },
        { text: 'end x', type: ParameterType.coordinate, required: true },
        { text: 'end y', type: ParameterType.coordinate, required: true },
        { text: 'end z', type: ParameterType.coordinate, required: true },
        { text: 'destination x', type: ParameterType.coordinate, required: true },
        { text: 'destination y', type: ParameterType.coordinate, required: true },
        { text: 'destination z', type: ParameterType.coordinate, required: true },
        { text: 'scan mode', type: ParameterType.scanMode, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // Unless entity target next
    {
      name: 'unless',
      documentation: 'Executes the command unless the specified condition is false.',
      permission_level: 1,
      parameters: [
        { text: 'unless', type: ParameterType.keyword, required: true },
        { text: 'entity', type: ParameterType.keyword, required: true },
        { text: 'target', type: ParameterType.selector, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // Unless score target objective operation source objective next
    {
      name: 'unless',
      documentation: 'Executes the command unless the specified condition is false.',
      permission_level: 1,
      parameters: [
        { text: 'unless', type: ParameterType.keyword, required: true },
        { text: 'score', type: ParameterType.keyword, required: true },
        { text: 'target', type: ParameterType.selector, required: true },
        { text: 'objective', type: ParameterType.objective, required: true },
        { text: 'operation', type: ParameterType.operation, required: true },
        { text: 'source', type: ParameterType.selector, required: true },
        { text: 'objective', type: ParameterType.objective, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
    // Unless score target objective matches range next
    {
      name: 'unless',
      documentation: 'Executes the command unless the specified condition is false.',
      permission_level: 1,
      parameters: [
        { text: 'unless', type: ParameterType.keyword, required: true },
        { text: 'score', type: ParameterType.keyword, required: true },
        { text: 'target', type: ParameterType.selector, required: true },
        { text: 'objective', type: ParameterType.objective, required: true },
        { text: 'matches', type: ParameterType.keyword, required: true },
        { text: 'range', type: ParameterType.integer_range, required: true },
        { text: 'next', type: ParameterType.executeSubcommand, required: true },
      ],
    },
  ],
};
