export declare namespace Vscode {
    /**
     *
     * @param path
     * @returns
     */
    function fromFs(path: string): string;
    function join(path: string, ...combine: string[]): string;
    /**
     *
     * @param uri
     * @returns
     */
    function isVscode(uri: string): boolean;
}
export declare namespace Fs {
    /**From something like file:///
     * @param uri
     * @returns
     */
    function FromVscode(uri: string): string;
}
//# sourceMappingURL=url.d.ts.map