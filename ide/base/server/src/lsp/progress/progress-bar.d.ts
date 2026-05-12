import { ProgressToken, WorkDoneProgressReporter } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
export declare class ProgressBar {
    private value;
    private maximum;
    private reporter;
    constructor(reporter: WorkDoneProgressReporter, title: string, value?: number, max?: number);
    setValue(value: number): void;
    addValue(value?: number): void;
    getValue(): number;
    getPercentage(): number;
    setMaximum(value: number): void;
    addMaximum(value?: number): void;
    getMaximum(): number;
    sendProgress(message?: string): void;
    sendMessage(message: string): void;
    done(): void;
}
/**
 *
 */
export declare namespace ProgressBar {
    /**
     *
     * @param title
     * @param value
     * @param max
     * @returns
     */
    function create(extension: ExtensionContext, title: string, value?: number, max?: number): Promise<ProgressBar>;
    function attach(extension: ExtensionContext, token: ProgressToken | undefined, title: string, value?: number, max?: number): ProgressBar;
    function noop(): ProgressBar;
}
//# sourceMappingURL=progress-bar.d.ts.map