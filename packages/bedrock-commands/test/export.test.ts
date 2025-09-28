import { CommandData } from "../src/lib/data/command-data";
import { CommandInfo, ParameterInfo } from "../src/lib/data/command-info";
import { ParameterType } from "../src/lib/types/parameter-type";
import { writeFileSync } from "fs";

interface Parameter {
  text: string;
  type: string;
  required: boolean;
  options?: any;
}

interface Command {
  name: string;
  parameters: Array<Parameter>;
  documentation: string;
}

interface ExportData {
  vanilla: Command[];
  edu: Command[];
}

describe.skip("Export", () => {
  const { Vanilla, Edu } = CommandData;

  it("exported", () => {
    const out: ExportData = {
      vanilla: [],
      edu: [],
    };

    Object.getOwnPropertyNames(Vanilla)
      .map((key) => Vanilla[key])
      .map(exportCommands)
      .forEach((commands) => out.vanilla.push(...commands));

    Object.getOwnPropertyNames(Edu)
      .map((key) => Edu[key])
      .map(exportCommands)
      .forEach((commands) => out.edu.push(...commands));

    writeFileSync("./out.json", JSON.stringify(out, null, 2));
  });
});

function exportCommands(data: CommandInfo[]): Command[] {
  return data.map(convertCommand);
}

function convertCommand(c: CommandInfo): Command {
  return {
    name: c.name,
    documentation: c.documentation,
    parameters: c.parameters.map(convertParameter),
  };
}

function convertParameter(p: ParameterInfo): Parameter {
  return {
    text: p.text,
    type: getParameterName(p.type),
    required: p.required,
    options: p.options,
  };
}

function getParameterName(p: ParameterType): string {
  return ParameterType[p];
}