import { Command } from "./command";
import { CommandInfo } from "../../data";
import { ParameterType } from "../parameter-type";
/**Gets the best matching commandInfo data, if multiple are returned, it unclear or somewhere not fully specified
 * @param command The command to search through
 * @param edu Whether or not to include education data
 * @returns An array with commands info*/
export declare function getBestMatches(command: Command, edu?: boolean): CommandInfo[];
/**Checks if the command matches the commandInfo
 * @param command The command to examine
 * @param data The commandInfo serving as the basis
 * @param edu If education content should be used or not
 * @returns true or false is this commandInfo matches the command*/
export declare function isMatch(command: Command, data: CommandInfo, edu?: boolean): boolean;
export declare function checkRequiredParameterLength(command: Command, data: CommandInfo): boolean;
/**Retrieves the command data related to the given keyword
 * @param name The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns An array with commands info*/
export declare function getCommandData(name: string, edu?: boolean, type?: ParameterType): CommandInfo[];
/**Checks if the given commandData is present
 * @param name The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns An array with commands info*/
export declare function hasCommandData(name: string, edu?: boolean): boolean;
/**Checks if the given commandData is present
 * @param command The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns True or false*/
export declare function IsCommand(command: string, edu?: boolean): boolean;
/** Checks if the given command is a execute sub command
 * @param command The command to check
 * @returns True or false*/
export declare function IsExecuteSubcommand(command: string): boolean;
