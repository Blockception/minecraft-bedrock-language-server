import { CodeAction, CodeActionParams, Command, Range } from 'vscode-languageserver';
import { Context } from '../context/context';
import { CodeActionContext } from './context';
/** */
export declare class CodeActionBuilder {
    /** */
    params: CodeActionParams;
    /** */
    out: (Command | CodeAction)[];
    context: Context<CodeActionContext>;
    /** */
    constructor(params: CodeActionParams, context: Context<CodeActionContext>);
    /**
     *
     * @returns
     */
    getText(range: Range | undefined): string;
    getId(range: Range | undefined): string;
    /** */
    push<T extends Command | CodeAction | undefined>(item: T): T;
    /**
     *
     * @param title
     * @param commandId
     * @param args
     * @returns
     */
    command(title: string, commandId: string, args: string[] | undefined): Command;
    /**
     * Creates a new action, with the given title
     * @param title
     * @returns
     */
    action(title: string): CodeAction;
}
//# sourceMappingURL=builder.d.ts.map