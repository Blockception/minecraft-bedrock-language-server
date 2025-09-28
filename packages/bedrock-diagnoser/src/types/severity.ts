/**The severity of an error */
export enum DiagnosticSeverity {
  /**The error is not an issue, but preferably not there*/
  none,
  /**The error is a possible issue, could be improved or a suggestion*/
  info,
  /**The error is an issue, but code can continue as normal*/
  warning,
  /**The error is an issue and can cause problems during runtime*/
  error,
}
