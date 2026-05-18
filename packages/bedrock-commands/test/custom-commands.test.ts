import { CommandContainer } from '../src/data/command-container';
import { getCommandData, hasCommandData, ParameterType } from '../src';

describe('Data/Custom Commands', () => {
  it('supports custom command containers', () => {
    const custom: CommandContainer = {
      'demo:ping': [
        {
          name: 'demo:ping',
          documentation: 'Ping command',
          permission_level: 0,
          parameters: [
            { text: 'demo:ping', type: ParameterType.keyword, required: true },
            { text: 'target', type: ParameterType.selector, required: true },
          ],
          source: { uri: 'c:\\bp\\scripts\\command.ts', line: 10, language: 'typescript' },
        },
      ],
    };

    expect(hasCommandData('demo:ping', false, custom)).toBeTruthy();
    expect(getCommandData('demo:ping', false, ParameterType.command, custom)).toHaveLength(1);
  });
});
