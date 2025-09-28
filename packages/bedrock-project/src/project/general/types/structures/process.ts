import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../../types";
import { Documentation } from "../../../../types";
import { GeneralInfo } from "../general-info";

export function process(command: Command, doc: TextDocument): GeneralInfo | undefined {
  //tag <selector> add <tag>
  if (command.parameters[1]?.text !== "save") return undefined;

  const structure = command.parameters[2];

  return GeneralInfo.create(
    structure.text,
    Types.Location.create(doc.uri, structure.offset),
    Documentation.getDoc(doc, () => `The mcstructure: ${structure.text}`, structure.offset)
  );
}
