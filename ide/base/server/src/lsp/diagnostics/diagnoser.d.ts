import { DocumentLocation } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilderContent, DiagnosticSeverity, ManagedDiagnosticsBuilder } from 'bc-minecraft-bedrock-diagnoser';
import { MCProject } from 'bc-minecraft-project';
import { Diagnostic } from 'vscode-languageserver';
import { TextDocument } from '../documents/text-document';
export declare class InternalDiagnoser implements ManagedDiagnosticsBuilder<TextDocument> {
    doc: TextDocument;
    items: Diagnostic[];
    context: DiagnosticsBuilderContent<TextDocument>;
    project: MCProject;
    done: () => void;
    private disabledCodes;
    /**@inheritdoc*/
    constructor(doc: TextDocument, project: MCProject, context: DiagnosticsBuilderContent<TextDocument>, doneFN: (e: InternalDiagnoser) => void);
    /**@inheritdoc*/
    add(position: DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number, data?: unknown): void;
}
//# sourceMappingURL=diagnoser.d.ts.map