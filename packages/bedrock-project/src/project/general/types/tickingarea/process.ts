import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { GeneralInfo } from "../general-info";
import { Documentation, TextDocument } from "../../../../types";

export function process(Command: Command, doc: TextDocument): GeneralInfo | undefined {
  //tickingarea add
  if (Command.parameters[1]?.text !== "add") return;

  //tickingarea add circle
  if (Command.parameters[2]?.text === "circle") {
    return ProcessCircleCommand(Command, doc);
  }

  return ProcessBoxCommand(Command, doc);
}

/**
 *
 * @param Command
 * @returns
 */
function ProcessCircleCommand(Command: Command, doc: TextDocument): GeneralInfo | undefined {
  //Tickingarea add circle <x> <y> <z> <r> [name]
  const parameters = Command.parameters;

  if (parameters.length < 7) return;

  let Name = "";
  let offset: number = 0;

  if (parameters.length > 7) {
    Name = parameters[7].text;
    offset = parameters[7].offset;
  } else {
    offset = parameters[3].offset;
  }

  return GeneralInfo.create(
    Name,
    Types.Location.create(doc.uri, parameters[3].offset),
    Documentation.getDoc(
      doc,
      () => {
        const Area = `x: ${parameters[3].text}, y: ${parameters[4].text}, z: ${parameters[5].text}, radius: ${parameters[6].text}`;
        return `The circular tickingarea: "${Name}"; ${Area}`;
      },
      offset
    )
  );
}

/**
 *
 * @param Command
 * @returns
 */
function ProcessBoxCommand(Command: Command, doc: TextDocument): GeneralInfo | undefined {
  //Tickingarea add <x> <y> <z> <x> <y> <z> [name]
  const parameters = Command.parameters;
  if (parameters.length < 8) return undefined;

  let Name = "";
  let offset: number = 0;

  if (parameters.length > 8) {
    Name = parameters[8].text;
    offset = parameters[8].offset;
  } else {
    offset = parameters[3].offset;
  }

  return GeneralInfo.create(
    Name,
    Types.Location.create(doc.uri, parameters[3].offset),
    Documentation.getDoc(
      doc,
      () => {
        const Area = `[${parameters[2].text}, ${parameters[3].text}, ${parameters[4].text}, ${parameters[5].text}, ${parameters[6].text}, ${parameters[7].text}]`;
        return `The box tickingarea: "${Name}"; ${Area}`;
      },
      offset
    )
  );
}
