import { CommandData, hasCommandData, ParameterType } from 'bc-minecraft-bedrock-command';
import { process } from './process';

describe('Behavior Pack/Script custom command processing', () => {
  beforeEach(() => {
    CommandData.clearCustomCommands();
  });

  afterEach(() => {
    CommandData.clearCustomCommands();
  });

  it('parses inline command registration with parameter lists', () => {
    process({
      uri: 'c:\\bp\\scripts\\custom.js',
      getText: () => `
CustomCommandRegistry.registerCommand({
  name: "example:hello",
  description: "Says hello",
  permission: CommandPermissionLevel.Admin,
  mandatoryParameters: [
    { name: "target", type: CustomArgumentType.EntitySelector }
  ],
  optionalParameters: [
    { name: "count", type: CustomArgumentType.Integer }
  ]
}, () => {});
`,
    });

    expect(hasCommandData('example:hello')).toBeTruthy();
    const command = CommandData.Custom['example:hello'][0];
    expect(command.source?.uri).toEqual('c:\\bp\\scripts\\custom.js');
    expect(command.parameters).toEqual([
      { text: 'example:hello', type: ParameterType.keyword, required: true },
      { text: 'target', type: ParameterType.selector, required: true },
      { text: 'count', type: ParameterType.integer, required: false },
    ]);
  });

  it('resolves variable-based registration and replaces commands by file', () => {
    process({
      uri: 'c:\\bp\\scripts\\custom.ts',
      getText: () => `
const definition = {
  name: "example:bye",
  description: "Says bye",
  parameters: [{ name: "msg", type: CustomArgumentType.String }]
};
CustomCommandRegistry.registerCommand(definition, () => {});
`,
    });

    expect(hasCommandData('example:bye')).toBeTruthy();

    process({
      uri: 'c:\\bp\\scripts\\custom.ts',
      getText: () => `CustomCommandRegistry.registerCommand({ name: "example:new" }, () => {});`,
    });

    expect(hasCommandData('example:bye')).toBeFalsy();
    expect(hasCommandData('example:new')).toBeTruthy();
  });
});
