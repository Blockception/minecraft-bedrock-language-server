/**The severity of an error */
export declare enum DiagnosticSeverity {
    /**The error is not an issue, but preferably not there*/
    none = 0,
    /**The error is a possible issue, could be improved or a suggestion*/
    info = 1,
    /**The error is an issue, but code can continue as normal*/
    warning = 2,
    /**The error is an issue and can cause problems during runtime*/
    error = 3
}
