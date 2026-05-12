import { TextDocument } from '../../lsp/documents';
export interface Path {
    path: string;
    property: string;
    isProperty: boolean;
}
export declare function getJsonPath(cursor: number, text: string | TextDocument): Path;
//# sourceMappingURL=path.d.ts.map