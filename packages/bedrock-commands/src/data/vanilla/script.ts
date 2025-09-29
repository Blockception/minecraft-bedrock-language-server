import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The script command */
export const script: CommandInfo[] = [
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'debugger', type: ParameterType.keyword, required: true },
      { text: 'close', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'debugger', type: ParameterType.keyword, required: true },
      { text: 'connect', type: ParameterType.keyword, required: true },
      { text: 'host', type: ParameterType.string, required: false },
      { text: 'port', type: ParameterType.integer, required: false },
    ],
  },
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'debugger', type: ParameterType.keyword, required: true },
      { text: 'listen', type: ParameterType.keyword, required: true },
      { text: 'port', type: ParameterType.integer, required: true },
    ],
  },
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'diagnostics', type: ParameterType.keyword, required: true },
      { text: 'startcapture', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'diagnostics', type: ParameterType.keyword, required: true },
      { text: 'stopcapture', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'profiler', type: ParameterType.keyword, required: true },
      { text: 'start', type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: 'script',
    documentation: 'Script debugger commands.',
    permission_level: 2,
    parameters: [
      { text: 'script', type: ParameterType.keyword, required: true },
      { text: 'profiler', type: ParameterType.keyword, required: true },
      { text: 'stop', type: ParameterType.keyword, required: true },
    ],
  },
];
