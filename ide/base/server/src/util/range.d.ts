import * as vsp from 'vscode-languageserver';
import * as vs from 'vscode-languageserver-textdocument';
export interface Range extends vs.Range, vsp.Range {
}
/**
 *
 */
export declare namespace Range {
    /**
     *
     * @param range
     * @param position
     * @returns
     */
    function Within(range: vs.Range | vsp.Location, position: vs.Position | number): boolean;
}
//# sourceMappingURL=range.d.ts.map