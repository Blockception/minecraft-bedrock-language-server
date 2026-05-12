import { CancellationToken, WorkDoneProgressReporter } from 'vscode-languageserver';
export declare namespace Processor {
    /**
     *
     * @param data
     * @param callbackFn
     * @param token
     * @param reporter
     * @returns
     */
    function forEach<T>(data: T[], callbackFn: (item: T, index: number, col: T[]) => void | Promise<void>, token?: CancellationToken, reporter?: Pick<WorkDoneProgressReporter, 'report'>): Promise<void>;
    function map<T, U>(data: T[], callbackFn: (item: T, index: number, col: T[]) => U | Promise<U>, token?: CancellationToken, reporter?: WorkDoneProgressReporter): Promise<U[]>;
}
//# sourceMappingURL=processor.d.ts.map