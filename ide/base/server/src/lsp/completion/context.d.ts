import { Command, CommandInfo, Parameter, ParameterInfo } from 'bc-minecraft-bedrock-command';
import { CancellationToken, CompletionParams, WorkDoneProgressReporter } from 'vscode-languageserver';
import { TextRange } from '../../minecraft/json/functions';
import { TextDocument } from '../documents';
import { CompletionBuilder } from './builder';
export interface CompletionContext extends CompletionParams {
    document: TextDocument;
    token: CancellationToken;
    workDoneProgress: WorkDoneProgressReporter;
    builder: CompletionBuilder;
    cursor: number;
}
export interface JsonCompletionContext extends CompletionContext {
    cursor: number;
    range: TextRange;
    currentText: string;
}
export interface CommandCompletionContext extends CompletionContext {
    parameter: ParameterInfo;
    parameterIndex: number;
    command: Command;
    bestMatch: CommandInfo;
    current: Parameter | undefined;
}
/**
 *
 */
export declare namespace CommandCompletionContext {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is CommandCompletionContext;
}
export declare namespace JsonCompletionContext {
    function getProperty(context: JsonCompletionContext): string | undefined;
}
//# sourceMappingURL=context.d.ts.map