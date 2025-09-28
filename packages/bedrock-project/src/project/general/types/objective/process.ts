import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument, Documentation } from "../../../../types";
import { GeneralCollection } from "../../general";
import { GeneralInfo } from "../general-info";

export function process(command: Command, doc: TextDocument, receiver: GeneralCollection): void {
  if (command.parameters.length < 3) {
    return;
  }

  const Mode = command.parameters[1];

  switch (Mode.text) {
    case "players":
      receiver.fakeEntities.set(CheckPlayer(command, doc));
      return;

    case "objectives":
      receiver.objectives.set(CheckObjective(command, doc));
      return;
  }

  return undefined;
}

/**
 *
 * @param Com
 * @param Comment
 * @returns
 */
function CheckObjective(Com: Command, doc: TextDocument): GeneralInfo | undefined {
  const objectiveMode = Com.parameters[2];

  if (Com.parameters.length < 4) {
    return;
  }

  if (objectiveMode.text === "add") {
    const ID = Com.parameters[3];
    const Type = Com.parameters[4];
    const offset = ID.offset;

    return GeneralInfo.create(
      ID.text,
      Types.Location.create(doc.uri, offset),
      Documentation.getDoc(
        doc,
        () => {
          let Doc = `The objective: ${ID.text}: ${Type.text}`;

          if (Com.parameters.length > 5) {
            Doc += " " + Com.parameters[5].text.replace(/"/g, "");
          }

          return Doc;
        },
        offset
      )
    );
  }

  return undefined;
}

function CheckPlayer(Com: Command, doc: TextDocument): GeneralInfo | undefined {
  if (Com.parameters.length > 3) {
    const Selector = Com.parameters[3];

    if (!Selector.text.startsWith("@") && Selector.text !== "*") {
      return GeneralInfo.create(
        Selector.text,
        Types.Location.create(doc.uri, Selector.offset),
        Documentation.getDoc(doc, () => `The fake player: ${Selector.text}`, Selector.offset)
      );
    }
  }

  return undefined;
}
