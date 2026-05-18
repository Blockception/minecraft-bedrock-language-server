import { CommandData } from '../src/data/command-data';
import { getCommandData, hasCommandData, ParameterType } from '../src';

describe('Data/Custom Commands', () => {
  beforeEach(() => {
    CommandData.clearCustomCommands();
  });

  afterEach(() => {
    CommandData.clearCustomCommands();
  });

  it('registers and removes custom commands by uri', () => {
    CommandData.setCustomCommands('c:\\bp\\scripts\\command.ts', {
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
    });

    expect(hasCommandData('demo:ping')).toBeTruthy();
    expect(getCommandData('demo:ping')).toHaveLength(1);

    CommandData.removeCustomCommandsByUri('c:\\bp\\scripts\\command.ts');

    expect(hasCommandData('demo:ping')).toBeFalsy();
    expect(getCommandData('demo:ping')).toHaveLength(0);
  });
});
