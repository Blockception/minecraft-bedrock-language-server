import { MolangFunction } from 'bc-minecraft-molang';
import { OffsetWord } from 'bc-vscode-words';
import { SignatureInformation } from 'vscode-languageserver';
export declare function generateSignatures(scope: string, cursor: number, items: MolangFunction[], parameters: OffsetWord[], query: string): SignatureInformation[];
export declare function generateSignature(scope: string, cursor: number, item: MolangFunction, parameters: OffsetWord[]): SignatureInformation;
//# sourceMappingURL=general.d.ts.map