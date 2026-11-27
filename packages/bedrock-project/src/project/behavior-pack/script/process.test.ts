import { hasCommandData, ParameterType } from 'bc-minecraft-bedrock-command';
import { toCommandContainer } from './custom-command';
import { process } from './process';

describe('Behavior Pack/Script custom command processing', () => {
  it('parses inline command registration with parameter lists', () => {
    const commands = process({
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
    const container = toCommandContainer({ forEach: (callbackfn) => commands.forEach(callbackfn) });

    expect(hasCommandData('example:hello', false, container)).toBeTruthy();
    const command = commands[0].syntaxes[0];
    expect(command.source?.uri).toEqual('c:\\bp\\scripts\\custom.js');
    expect(command.parameters).toEqual([
      { text: 'example:hello', type: ParameterType.keyword, required: true },
      { text: 'target', type: ParameterType.selector, required: true },
      { text: 'count', type: ParameterType.integer, required: false },
    ]);
  });

  it('resolves variable-based registration and replaces commands by file', () => {
    const first = process({
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
    const firstContainer = toCommandContainer({ forEach: (callbackfn) => first.forEach(callbackfn) });

    expect(hasCommandData('example:bye', false, firstContainer)).toBeTruthy();

    const second = process({
      uri: 'c:\\bp\\scripts\\custom.ts',
      getText: () => `CustomCommandRegistry.registerCommand({ name: "example:new" }, () => {});`,
    });
    const secondContainer = toCommandContainer({ forEach: (callbackfn) => second.forEach(callbackfn) });

    expect(hasCommandData('example:bye', false, secondContainer)).toBeFalsy();
    expect(hasCommandData('example:new', false, secondContainer)).toBeTruthy();
  });

  it('parses registration via the real system.beforeEvents.startup.subscribe shape', () => {
    const commands = process({
      uri: 'c:\\bp\\scripts\\main.js',
      getText: () => `
import { system } from "@minecraft/server";

system.beforeEvents.startup.subscribe((init) => {
  init.customCommandRegistry.registerCommand({
    name: "example:greet",
    description: "Says hi",
  }, () => {});
});
`,
    });
    const container = toCommandContainer({ forEach: (callbackfn) => commands.forEach(callbackfn) });

    expect(hasCommandData('example:greet', false, container)).toBeTruthy();
  });

  it('parses registration via a destructured customCommandRegistry', () => {
    const commands = process({
      uri: 'c:\\bp\\scripts\\main.js',
      getText: () => `
system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
  customCommandRegistry.registerCommand({ name: "example:wave" }, () => {});
});
`,
    });
    const container = toCommandContainer({ forEach: (callbackfn) => commands.forEach(callbackfn) });

    expect(hasCommandData('example:wave', false, container)).toBeTruthy();
  });
});
