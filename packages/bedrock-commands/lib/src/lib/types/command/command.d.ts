import { CommandInfo } from "../../data";
import { ParameterType } from "../parameter-type";
import { Parameter } from "./parameter";
/**A class that helps interpreting written commands.*/
export declare class Command {
    private _matches;
    /**The parameters of the command.*/
    parameters: Parameter[];
    subType: ParameterType;
    /**Creates a new instance of a command*/
    constructor();
    /**Gets the keyword of this command (first parameter)
     *@returns The keyword or "" is command is empty*/
    getKeyword(): string;
    /**Gets all the command data that is the possible best match data
     * @param edu Whether or not to include education data
     * @returns An array with commands info*/
    getCommandData(edu?: boolean): CommandInfo[];
    /**Gets the best matching commandInfo data, if multiple are returned, it unclear or somewhere not fully specified
     * @param edu Whether or not to include education data
     * @returns An array with commands info*/
    getBestMatch(edu?: boolean): CommandInfo[];
    /**Gets the subcommand if there is any present
     * @param edu Whether or not to include education data
     * @returns A sub command or undefined if there is no subcommand*/
    getSubCommand(edu?: boolean): Command | undefined;
    /**Finds the parameter index the cursor is at
     * @param index The index
     * @returns If cursor is not inside command then -1 is returned*/
    findCursorIndex(cursor: number): number;
    /**Checks if this command is empty or not
     * @returns True or false if this command is empty*/
    isEmpty(): boolean;
    /**Creates a slice of the command on the specified parameter indexes
     * @param start The startIndex or undefined
     * @param end The startIndex or undefined
     * @returns A new command that is represents the slice*/
    slice(startIndex?: number | undefined, end?: number | undefined): Command;
    /**Checks if the given cursor offset is in the subcommand or in the main command (or outside)
     * @param cursor The cursor offset
     * @returns A subcommand if the cursor is in the subcommand else returned undefined*/
    isInSubCommand(cursor: number, edu?: boolean): Command | undefined;
    /**Parses the given text as a command
     * @param text The text to process
     * @param offset The offset the text starts at in the document
     * @returns A command*/
    static parse(text: string, offset?: number): Command;
}
