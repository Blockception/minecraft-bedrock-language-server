import { CommandInfo } from '../../../packages/bedrock-commands/src/data/command-info.js';
import { ParameterType } from '../../../packages/bedrock-commands/src/types/parameter-type.js';
import { convert } from './convert.js';
import * as command_data from './minecraft-data.js';
import { quoteString } from './strings.js';
const path = require('node:path');
const fs = require('fs');

async function main() {
  console.log('==== Loading ====');
  const data = await command_data.get();

  console.log('==== Converting ====');
  const commands = convert(data);

  // data.command_enums
  //   .filter((i) => i.values.length === 1)
  //   .forEach((i) => {
  //     console.log(`  ${i.name.toUpperCase()}: "${i.values[0].value}",`);
  //   });
  // data.command_enums
  //   .filter((i) => i.values.length > 1)
  //   .filter((i) => i.values.length < 50)
  //   .forEach((i) => {
  //     console.log(`  ["${i.name.toUpperCase()}", ["${i.values.map(i => i.value).join('", "')}"]],`);
  //   });

  console.log('==== Saving ====');
  for (const [comm, info] of Object.entries(commands)) {
    save(comm, info);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

const folder = path.join(__dirname, '..', '..', '..', 'packages', 'bedrock-commands', 'src', 'data', 'vanilla');

function save(comm: string, data: CommandInfo[]) {
  const filePath = path.join(folder, `${comm}.ts`);

  let content = `import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The ${comm} command */
export const ${comm}: CommandInfo[] = [`;
  data.forEach((d) => {
    content += `
  {
    name: ${quoteString(d.name)},
    documentation: ${quoteString(d.documentation)},
    permission_level: ${d.permission_level},
    parameters: [`;
    d.parameters.forEach((p) => {
      content += `
      { text: '${p.text}', type: ParameterType.${ParameterType[p.type]}, required: ${p.required}`;
      if (p.options) {
        content += `, options: {`;
        if (p.options.acceptedValues) {
          content += ` acceptedValues: [${p.options.acceptedValues.map((v) => quoteString(v)).join(', ')}]`;
        }
        if (p.options.minimum) {
          content += `, minimum: ${p.options.minimum}`;
        }
        if (p.options.maximum) {
          content += `, maximum: ${p.options.maximum}`;
        }
        if (p.options.playerOnly) {
          content += `, playerOnly: ${p.options.playerOnly}`;
        }
        if (p.options.allowFakePlayers) {
          content += `, allowFakePlayers: ${p.options.allowFakePlayers}`;
        }
        if (p.options.wildcard) {
          content += `, wildcard: ${p.options.wildcard}`;
        }
        content += ` }`;
      }
      content += ` },`;
    });
    content += `
    ],
  },`;
  });
  content += `
];`;

  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
}
