import { TextDocument } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { DiagnosticsBuilderContent, DiagnosticSeverity, DocumentDiagnosticsBuilder, ManagedDiagnosticsBuilder } from "../src/lib/types";
export interface Error {
    position: Types.DocumentLocation;
    message: string;
    severity: DiagnosticSeverity;
    code: string | number;
}
export declare class TestDiagnoser<T extends TextDocument = TextDocument> implements ManagedDiagnosticsBuilder<T> {
    items: Error[];
    context: DiagnosticsBuilderContent<T>;
    project: MCProject;
    doneMark: boolean;
    constructor(context?: DiagnosticsBuilderContent<T> | undefined, project?: MCProject | undefined);
    done(): void;
    /**
     *
     * @param position
     * @param message
     * @param severity
     * @param code
     */
    add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void;
    expectDone(): void;
    /**
     *
     */
    expectEmpty(): void;
    expectAny(): void;
    /**
     *
     * @param number
     */
    expectAmount(number: number): void;
    /**
     *
     * @param number
     */
    expectGreaterThan(number: number): void;
    /**
     *
     * @param number
     */
    expectGreaterThanOrEqual(number: number): void;
    writeItemsMessage(): string;
    /**Gets the first matching message
     * @param message
     * @returns*/
    getMessage(message: string): Error | undefined;
    /**Gets the first matching position
     * @param message
     * @returns*/
    getPosition(position: Types.DocumentLocation): Error | undefined;
    /**Gets the first matching severity
     * @param message
     * @returns*/
    getSeverity(severity: DiagnosticSeverity): Error | undefined;
    /**Gets the first matching code
     * @param message
     * @returns*/
    getCode(code: string | number): Error | undefined;
    /**Checks if the message is inside the internal list
     * @param message
     * @returns
     */
    hasMessage(message: string): boolean;
    /**Checks if the position is inside the internal list
     * @param position
     * @returns
     */
    hasPosition(position: Types.DocumentLocation): boolean;
    /**Checks if the severity is inside the internal list
     * @param message
     * @returns
     */
    hasSeverity(severity: DiagnosticSeverity): boolean;
    /**Checks if the code is inside the internal list
     * @param message
     * @returns
     */
    hasCode(code: string | number): boolean;
}
export declare class TestDocumentDiagnoser<T extends TextDocument = TextDocument> extends TestDiagnoser<T> implements DocumentDiagnosticsBuilder<T> {
    document: T;
    constructor(document: T, context?: DiagnosticsBuilderContent<T> | undefined, project?: MCProject | undefined);
}
export declare namespace TestDiagnoser {
    function create(files?: Map<string, string> | undefined): TestDiagnoser;
    function createDocument(files: Map<string, string> | undefined, document: TextDocument): TestDocumentDiagnoser;
    function emptyContext(files?: Map<string, string> | undefined): DiagnosticsBuilderContent;
}
