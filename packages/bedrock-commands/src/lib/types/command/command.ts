import { CommandInfo } from "../../data";
import { ParameterType } from "../parameter-type";
import { getBestMatches, getCommandData } from "./functions";
import { Parameter } from "./parameter";
import { GetParameters, ParameterBuilder } from "./parse";

/**A class that helps interpreting written commands.*/
export class Command {
  private _matches: CommandInfo[] | undefined;

  /**The parameters of the command.*/
  public parameters: Parameter[];
  public subType: ParameterType;

  /**Creates a new instance of a command*/
  constructor() {
    this._matches = undefined;
    this.parameters = [];
    this.subType = ParameterType.command;
  }

  /**Gets the keyword of this command (first parameter)
   *@returns The keyword or "" is command is empty*/
  getKeyword(): string {
    if (this.parameters.length <= 0) return "";

    return this.parameters[0].text;
  }

  /**Gets all the command data that is the possible best match data
   * @param edu Whether or not to include education data
   * @returns An array with commands info*/
  getCommandData(edu: boolean = false): CommandInfo[] {
    return getCommandData(this.getKeyword(), edu, this.subType);
  }

  /**Gets the best matching commandInfo data, if multiple are returned, it unclear or somewhere not fully specified
   * @param edu Whether or not to include education data
   * @returns An array with commands info*/
  getBestMatch(edu: boolean = false): CommandInfo[] {
    if (this._matches) return this._matches;

    return (this._matches = getBestMatches(this, edu));
  }

  /**Gets the subcommand if there is any present
   * @param edu Whether or not to include education data
   * @returns A sub command or undefined if there is no subcommand*/
  getSubCommand(edu: boolean = false): Command | undefined {
    const matches = this.getBestMatch(edu);

    for (let I = 0; I < matches.length; I++) {
      const item = matches[I];
      const index = item.parameters.findIndex((x) => {
        return x.type === ParameterType.command || x.type === ParameterType.executeSubcommand;
      });

      if (index > -1 && index < this.parameters.length) {
        const out = this.slice(index);
        out.subType = item.parameters[index].type;

        return out;
      }
    }
  }

  /**Finds the parameter index the cursor is at
   * @param index The index
   * @returns If cursor is not inside command then -1 is returned*/
  findCursorIndex(cursor: number): number {
    let out = 0;
    for (let I = 0; I < this.parameters.length; I++) {
      const elem = this.parameters[I];

      //If the cursor is bigger or equal to the offset of the parameter its but be in that parameter or further ahead, else break; and return 0
      if (elem.offset <= cursor) {
        out = I;

        const endIndex = elem.offset + elem.text.length;
        //If the cursor is below the end of parameter or equal to it, return this parameter index
        if (cursor <= endIndex) {
          return I;
          //if the cursor is further then the end of the parameter, move it at least by one, cause its not this parameter.
        } else if (cursor > endIndex) {
          out = I + 1;
        }
      } else {
        break;
      }
    }

    return out;
  }

  /**Checks if this command is empty or not
   * @returns True or false if this command is empty*/
  isEmpty(): boolean {
    return this.parameters.length == 0;
  }

  /**Creates a slice of the command on the specified parameter indexes
   * @param start The startIndex or undefined
   * @param end The startIndex or undefined
   * @returns A new command that is represents the slice*/
  slice(startIndex?: number | undefined, end?: number | undefined): Command {
    const Out = new Command();
    Out.parameters = this.parameters.slice(startIndex, end);

    return Out;
  }

  /**Checks if the given cursor offset is in the subcommand or in the main command (or outside)
   * @param cursor The cursor offset
   * @returns A subcommand if the cursor is in the subcommand else returned undefined*/
  isInSubCommand(cursor: number, edu: boolean = false): Command | undefined {
    const get = this.getSubCommand(edu);

    if (get && get.parameters[0].offset <= cursor) return get;

    return undefined;
  }

  /**Parses the given text as a command
   * @param text The text to process
   * @param offset The offset the text starts at in the document
   * @returns A command*/
  static parse(text: string, offset: number = 0): Command {
    const Out = new Command();

    //Record start offset from trimming
    const oldLength = text.length;
    text = text.trimStart();
    offset += oldLength - text.length;
    //Trim end
    text = text.trimEnd();

    const builder = new ParameterBuilder(offset);
    GetParameters(text, builder);

    Out.parameters = builder.items;

    return Out;
  }
}
