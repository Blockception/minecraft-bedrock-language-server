import { TextDocument } from 'bc-minecraft-bedrock-project';
import { ExpressionNode, FunctionCallNode, MolangSet } from 'bc-minecraft-molang';
import { DiagnosticsBuilder, DocumentDiagnosticsBuilder } from '../../types';
export declare function diagnose_molang_syntax_current_document(diagnoser: DocumentDiagnosticsBuilder, obj?: string | Record<string, any>): MolangSet;
export declare function diagnose_molang_syntax_document(doc: TextDocument, diagnoser: DiagnosticsBuilder, obj?: string | Record<string, any>): MolangSet;
export declare function diagnose_molang_syntax_text(text: string, diagnoser: DiagnosticsBuilder, obj?: string | Record<string, any>): MolangSet;
export declare function diagnose_molang_syntax_line(line: string, diagnoser: DiagnosticsBuilder): MolangSet;
export declare function diagnose_molang_syntax_set(set: MolangSet, diagnoser: DiagnosticsBuilder, documentUri?: string): MolangSet;
export declare function diagnose_molang_syntax(expression: ExpressionNode, diagnoser: DiagnosticsBuilder): void;
/**
 * Diagnoses Molang expression optimizations
 * @param expression The expression to diagnose
 * @param diagnoser The diagnoser to report issues to
 */
export declare function diagnose_molang_syntax_optimizations(expression: ExpressionNode, diagnoser: Pick<DiagnosticsBuilder, "add">): void;
/**
 * Diagnoses a Molang function call for correctness
 * @param fn The function call node to diagnose
 * @param diagnoser The diagnoser to report issues to
 * @param documentUri Optional document URI to detect pack type
 * @returns void
 */
export declare function diagnose_molang_function(fn: FunctionCallNode, diagnoser: DiagnosticsBuilder, documentUri?: string): void;
//# sourceMappingURL=expressions.d.ts.map