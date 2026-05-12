"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_type_js_1 = require("../../../packages/bedrock-commands/src/types/parameter-type.js");
const convert_js_1 = require("./convert.js");
const command_data = __importStar(require("./minecraft-data.js"));
const strings_js_1 = require("./strings.js");
const node_path_1 = __importDefault(require("node:path"));
const fs_1 = __importDefault(require("fs"));
async function main() {
    console.log('==== Loading ====');
    const data = await command_data.get();
    console.log('==== Converting ====');
    const commands = (0, convert_js_1.convert)(data);
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
const folder = node_path_1.default.join(__dirname, '..', '..', '..', 'packages', 'bedrock-commands', 'src', 'data', 'vanilla');
function save(comm, data) {
    const filePath = node_path_1.default.join(folder, `${comm}.ts`);
    let content = `import { ParameterType } from '../../types/parameter-type';
import { CommandInfo } from '../command-info';

/**The ${comm} command */
export const ${comm}: CommandInfo[] = [`;
    data.forEach((d) => {
        content += `
  {
    name: ${(0, strings_js_1.quoteString)(d.name)},
    documentation: ${(0, strings_js_1.quoteString)(d.documentation)},
    permission_level: ${d.permission_level},
    parameters: [`;
        d.parameters.forEach((p) => {
            content += `
      { text: '${p.text}', type: ParameterType.${parameter_type_js_1.ParameterType[p.type]}, required: ${p.required}`;
            if (p.options) {
                content += `, options: {`;
                if (p.options.acceptedValues) {
                    content += ` acceptedValues: [${p.options.acceptedValues.map((v) => (0, strings_js_1.quoteString)(v)).join(', ')}]`;
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
    fs_1.default.writeFileSync(filePath, content, { encoding: 'utf-8' });
}
//# sourceMappingURL=command-import.js.map