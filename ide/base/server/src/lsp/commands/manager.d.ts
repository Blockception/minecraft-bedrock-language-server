import { Context } from '../context/context';
import { CommandContext, ICommand } from './context';
export declare class CommandManager implements ICommand {
    private _commands;
    constructor();
    commands(): MapIterator<[string, ICommand]>;
    /**
     * Adds a new command to the service handler
     * @param id The command identifcation vscode uses
     * @param callback The function to call or the ICommand object to use
     * @param register Whenever or not the function must be registered on server side
     * @returns this
     */
    add(id: string, callback: ICommand | ICommand['execute'], register?: boolean): this;
    execute(context: Context<CommandContext>): any | Promise<any>;
    static load(): CommandManager;
}
//# sourceMappingURL=manager.d.ts.map