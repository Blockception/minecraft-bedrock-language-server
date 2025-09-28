import { DiagnosticsBuilder, DocumentDiagnosticsBuilder } from "../../types";
export declare namespace Json {
    /**Loads the object and casts it to the specified thandle_json_errorype, if it fails then undefined is loaded and the error message is send to the diagnoser
     * @param doc The text document to load from
     * @param diagnoser The diagnoser to load from
     * @returns Either the object cast to the specific type, or undefined if failed*/
    function LoadReport<T>(diagnoser: DocumentDiagnosticsBuilder): T | undefined;
    function parse(text: string): any;
    /**
     *
     * @param value
     * @param diagnoser
     * @param type
     * @param code
     * @param checkFn
     * @returns
     */
    function TypeCheck<T>(value: any, diagnoser: DiagnosticsBuilder, type: string, code: string, checkFn: (value: any) => value is T): value is T;
}
