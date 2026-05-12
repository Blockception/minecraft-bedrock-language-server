import { Context } from '../../context/context';
import { CommandContext } from '../context';
import { CommandManager } from '../manager';
export declare class TemplateItem {
    private _commandId;
    private _content;
    private _filename;
    constructor(commandId: string, content: string, ...paths: string[]);
    commandId(): string;
    templateId(): string;
    filename(): string;
    content(): string;
    /**
     *
     * @param context
     * @param folder
     * @param attributes
     * @returns
     */
    execute(context: Context<CommandContext>, folder?: string | undefined, attributes?: Record<string, string>): Promise<boolean>;
}
export declare const TemplateCommands: TemplateItem[];
export declare function getTemplateCommand(command: string): TemplateItem | undefined;
export declare function setupTemplates(manager: CommandManager): void;
//# sourceMappingURL=templates.d.ts.map