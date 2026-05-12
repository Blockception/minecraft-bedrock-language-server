import { SignatureInformation } from 'vscode-languageserver';
/**
 *
 */
export interface SignatureCarrier {
    /**
     *
     */
    __signature?: SignatureInformation;
}
/**
 *
 */
export declare namespace SignatureCarrier {
    /**
     *
     * @param value
     * @param generate
     * @returns
     */
    function get<T>(value: T, generate: (value: T) => SignatureInformation): SignatureInformation;
}
//# sourceMappingURL=carrier.d.ts.map